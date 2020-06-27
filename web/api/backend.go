package main

import (
	"encoding/json"
	"io"
	"log"
	"net/http"
	"strings"
	"time"

	"github.com/dgrijalva/jwt-go"

	"github.com/gorilla/mux"
)

var jwtKey = []byte("my_secret_key")

// CredentialsHandler takes as input a json body with the parts of the command
// to be executed and a json body representing the uploaded credentials.json file and returns
// a created jwt token that will be sent to the front end and cached for reused if needed
// returns a 401 status if jwt token cannot be created.
func CredentialsHandler(w http.ResponseWriter, r *http.Request) {
	var creds WrapperCommand
	setupResponse(&w, r)
	if (*&r).Method == "OPTIONS" {
		return
	}

	// Get the JSON body and decode into credentials.
	err := json.NewDecoder(r.Body).Decode(&creds)
	if err != nil {
		// If the structure of the body is wrong, return an HTTP error.
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	if len(creds.Credential) == 0 {
		w.WriteHeader(http.StatusBadRequest)
		io.WriteString(w, `{"error":"cannot make token without credentials"}`)
		return
	}

	// Declare the expiration time of the token
	// here, we have kept it as 1 day.
	expirationTime := time.Now().Add(1440 * time.Minute)
	// Create the JWT claims, which includes the uploaded credentials json body and expiry time.
	claims := &Claims{
		UploadCredentials: creds.Credential,
		StandardClaims: jwt.StandardClaims{
			// In JWT, the expiry time is expressed as unix milliseconds.
			ExpiresAt: expirationTime.Unix(),
		},
	}

	// Declare the token with the algorithm used for signing, and the claims.
	signedCredentials := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	// Create the JWT string
	credentialsString, err := signedCredentials.SignedString(jwtKey)
	if err != nil {
		// If there is an error in creating the JWT return an internal server error.
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	io.WriteString(w, `{"token":"`+credentialsString+`"}`)

}

// AuthHandler checks if the token specified in the authorization bearer of the http request
// is valid, or not expired and created by the web server.
// Returning a 401 status if token is not valid.
func AuthHandler(w http.ResponseWriter, r *http.Request) {
	// Extracting the token from the Request Header.
	credentialTokenString := strings.Split(r.Header.Get("Authorization"), "Bearer ")[1]

	//Verifying the token by checking the signing method.
	credentialToken, err := jwt.Parse(credentialTokenString, func(token *jwt.Token) (interface{}, error) {
		// Don't forget to validate the alg is what you expect:
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			w.WriteHeader(http.StatusBadRequest)
		}
		return jwtKey, nil
	})

	//Validating the token.
	if _, ok := credentialToken.Claims.(jwt.MapClaims); ok && credentialToken.Valid {
		var creds WrapperCommand
		err := json.NewDecoder(r.Body).Decode(&creds)
		if err != nil {
			// If the structure of the body is wrong, return an HTTP error.
			w.WriteHeader(http.StatusBadRequest)
			return
		}
		response := ExecuteWrapper(creds)
		io.WriteString(w, `{"response":"`+response+`"}`)
	} else {
		w.WriteHeader(http.StatusUnauthorized)
		io.WriteString(w, err.Error())
	}
}

// NoCredentialsHandler for the case when a token is not used.
// Takes as input a json body with the parts of the command to be executed.
func NoCredentialsHandler(w http.ResponseWriter, r *http.Request) {
	var creds WrapperCommand
	err := json.NewDecoder(r.Body).Decode(&creds)
	if err != nil {
		// If the structure of the body is wrong, return an HTTP error.
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	response := ExecuteWrapper(creds)
	io.WriteString(w, `{"response":"`+response+`"}`)
}

// ExecuteWrapper takes as an input a WrapperCommand object and will
// invoke the wrapper and return a string that is the OAuth2l response
func ExecuteWrapper(wc WrapperCommand) string {
	newWrapperCommand := &WrapperCommand{
		CommandType: wc.CommandType,
		Args:        wc.Args,
	}
	for k := range newWrapperCommand.Args {
		if !strings.Contains(k, "--") {
			newWrapperCommand.Args["--"+k] = newWrapperCommand.Args[k]
			delete(newWrapperCommand.Args, k)
		}
	}
	response, err := newWrapperCommand.Execute()
	if err != nil {
		return err.Error()
	}
	return response
}

func setupResponse(w *http.ResponseWriter, req *http.Request) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
	(*w).Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	(*w).Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
}

func main() {
	router := mux.NewRouter()
	log.Println("Authorization Playground")

	router.HandleFunc("/credentials", CredentialsHandler)
	router.HandleFunc("/auth", AuthHandler)
	router.HandleFunc("/nocredentials", NoCredentialsHandler)

	var srv = &http.Server{
		Handler:      router,
		Addr:         "127.0.0.1:8080",
		WriteTimeout: 15 * time.Second,
		ReadTimeout:  15 * time.Second,
	}

	log.Fatal(srv.ListenAndServe())
}
