package main

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"strings"
	"time"

	jwtmiddleware "github.com/auth0/go-jwt-middleware"
	"github.com/dgrijalva/jwt-go"

	"github.com/gorilla/mux"
)

// Claims object that will be encoded to a JWT.
// We add jwt.StandardClaims as an embedded type, to provide fields like expiry time
type Claims struct {
	UploadCredentials map[string]interface{}
	jwt.StandardClaims
}

var jwtKey = []byte(os.Getenv("SECRET_KEY"))
var creds WrapperCommand

// CredentialsHandler takes as input a json body with the parts of the command
//to be executed and a json body representing the uploaded credentials.json file and returns
// a created jwt token that will be sent to the front end and cached for reused if needed
//returns a 401 status if jwt token cannot be created
func CredentialsHandler(w http.ResponseWriter, r *http.Request) {
	setupResponse(&w, r)
	if (*&r).Method == "OPTIONS" {
		return
	}

	// Get the JSON body and decode into credentials
	err := json.NewDecoder(r.Body).Decode(&creds)
	if err != nil {
		// If the structure of the body is wrong, return an HTTP error
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	if len(creds.Credential) == 0 {
		w.WriteHeader(http.StatusBadRequest)
		io.WriteString(w, `{"error":"cannot make token without credentials"}`)
		return
	}

	// Declare the expiration time of the token
	// here, we have kept it as 24 minutes
	expirationTime := time.Now().Add(1440 * time.Minute)
	// Create the JWT claims, which includes the uploaded credentials json body and expiry time
	claims := &Claims{
		UploadCredentials: creds.Credential,

		StandardClaims: jwt.StandardClaims{
			// In JWT, the expiry time is expressed as unix milliseconds
			ExpiresAt: expirationTime.Unix(),
		},
	}

	// Declare the token with the algorithm used for signing, and the claims
	signedCredentials := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	// Create the JWT string
	credentialsString, err := signedCredentials.SignedString(jwtKey)
	if err != nil {
		// If there is an error in creating the JWT return an internal server error
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	io.WriteString(w, `{"token":"`+credentialsString+`"}`)

}

// AuthHandler checks if the token specified in the authorization bearer of the http request
// is valid, or not expired and created by the web server.
// Returning a 401 status if token is not valid.
func AuthHandler(next http.Handler) http.Handler {
	jwtMiddleware := jwtmiddleware.New(jwtmiddleware.Options{
		ValidationKeyGetter: func(token *jwt.Token) (interface{}, error) {
			return jwtKey, nil
		},
		SigningMethod: jwt.SigningMethodHS256,
	})
	return jwtMiddleware.Handler(next)
}

//NoCredentialsHandler for the case when a token is not used.
// Takes as input a json body with the parts of the command to be executed
func NoCredentialsHandler(w http.ResponseWriter, r *http.Request) {
	//cacheCreds is initialized so that it will not tamper with the global variable creds that would
	//already be intialized when the user uploads the credentials.json file in the frontend.
	var cacheCreds WrapperCommand
	err := json.NewDecoder(r.Body).Decode(&cacheCreds)
	if err != nil {
		// If the structure of the body is wrong, return an HTTP error
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	creds = cacheCreds
	ExecuteWrapperHandler(w, r)

}

//ExecuteWrapperHandler will invoke the wrapper. Returns a 401 status if command is bad
func ExecuteWrapperHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Add("Content-Type", "application/json")
	newWrapperCommand := &WrapperCommand{
		RequestType: creds.RequestType,
		Args:        creds.Args,
	}
	for k := range newWrapperCommand.Args {
		if !strings.Contains(k, "--") {
			newWrapperCommand.Args["--"+k] = newWrapperCommand.Args[k]
			delete(newWrapperCommand.Args, k)
		}
	}
	response, err := newWrapperCommand.Execute()
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
	}
	io.WriteString(w, `{"response":"`+response+`"}`)
}

func setupResponse(w *http.ResponseWriter, req *http.Request) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
	(*w).Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	(*w).Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
}

func main() {
	router := mux.NewRouter()
	fmt.Println("Authorization Playground")

	router.HandleFunc("/credentials", CredentialsHandler)

	router.Handle("/auth", AuthHandler(http.HandlerFunc(ExecuteWrapperHandler)))

	router.HandleFunc("/nocredentials", NoCredentialsHandler)

	var srv = &http.Server{
		Handler:      router,
		Addr:         "127.0.0.1:8080",
		WriteTimeout: 15 * time.Second,
		ReadTimeout:  15 * time.Second,
	}

	log.Fatal(srv.ListenAndServe())
}
