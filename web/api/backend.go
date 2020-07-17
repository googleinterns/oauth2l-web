package handler

import (
	"encoding/json"
	"io"
	"log"
	"net/http"
	"reflect"
	"strings"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/gorilla/mux"
)

//Request struct represents the request that the backend will recieve.
type Request struct {
	CommandType string
	Args
	Credential
	CacheToken bool
	UseToken   bool
	Token      string
}

// Response struct represents the JSON response that the backend will send.
type Response struct {
	OAuth2lResponse string `json:"oauth2lResponse"`
	Token           string `json:"token"`
}

// Claims object that represents the claims (or the information about the token) of the JWT.
// We add jwt.StandardClaims as an embedded type, to provide fields like expiry time.
type Claims struct {
	UploadCredentials map[string]interface{}
	jwt.StandardClaims
}

// secret key to make the uploadCredentials token
var jwtKey = []byte("my_secret_key")

// SetupResponseHeaders sets up the headers for the response.
func setupResponseHeaders(w *http.ResponseWriter, req *http.Request) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
	(*w).Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	(*w).Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
}

// authenticateCredentialsToken takes as input a string representing the uploadCredentials token specified in the request body and checks if
// the uploadCredentials token is valid. It returns the uploadCredentials body stored in the uploadCredentials token if uploadCredentials token is valid. Otherwise, it returns an error.
func authenticateCredentialsToken(credentialTokenString string) (map[string]interface{}, error) {
	// new claims object to use to parse through the token and map the token claims to the new object.
	claims := &Claims{}

	// Validating token and mapping the token claims to the claims object.
	_, err := jwt.ParseWithClaims(credentialTokenString, claims, func(token *jwt.Token) (interface{}, error) {
		return jwtKey, nil
	})
	if err != nil {
		return nil, err
	}
	return claims.UploadCredentials, nil
}

// wrapperExecutor takes as an input a WrapperCommand object and will
// invoke the wrapper and return a string that is the OAuth2l response.
func wrapperExecutor(wc WrapperCommand) string {
	// Adding dashes to the arguments to match the OAuth2l format.
	for k := range wc.Args {
		if !strings.Contains(k, "--") {
			wc.Args["--"+k] = wc.Args[k]
			delete(wc.Args, k)
		}
	}
	// Calling the wrapper.
	CMDresponse, err := wc.Execute()
	if err != nil {
		return err.Error()
	}
	return CMDresponse
}

// createCredentialsToken takes as input a representiation of the uplodaded uploadCredentials json body and returns a token using the
// uploadCredentials json body as the payload.
func createCredentialsToken(Credentials map[string]interface{}) (string, error) {
	// Declare the expiration time of the token. Here, we have kept it as 1 day.
	expirationTime := time.Now().Add(1440 * time.Minute)
	// Create the JWT claims, which includes the uploaded uploadCredentials json body and expiry time.
	claims := &Claims{
		UploadCredentials: Credentials,
		StandardClaims: jwt.StandardClaims{
			// In JWT, the expiry time is expressed as unix milliseconds.
			ExpiresAt: expirationTime.Unix(),
		},
	}
	// Declare the token with the algorithm used for signing, and the claims.
	signedCredentialsToken := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	// Create the uploadCredentials token string.
	credentialsTokenString, err := signedCredentialsToken.SignedString(jwtKey)
	return credentialsTokenString, err
}

func isCredentialsNeeded(requestType string) bool {
	if reflect.DeepEqual(requestType, "reset") || reflect.DeepEqual(requestType, "info") || reflect.DeepEqual(requestType, "test") {
		return false
	}
	return true
}

// Handler takes as input a json body with the parts of the command
// to be executed and a json body representing the uploaded uploadCredentials.json file and returns
// a created jwt token that will be sent to the front end and cached for reused if needed
// returns a 400 status if the uploadCredentials token cannot be created or there is not enough information
// to extract the uploadCredentials file needed or a 401 status if the uploadCredentials token cannot be validated.
func Handler(w http.ResponseWriter, r *http.Request) {
	// Request object to store information about request.
	var requestBody Request

	// Setting up reponse Headers.
	setupResponseHeaders(&w, r)
	if (*&r).Method == "OPTIONS" {
		return
	}

	// Get the JSON body and decode into requestBody.
	err := json.NewDecoder(r.Body).Decode(&requestBody)
	if err != nil {
		// If the structure of the body is wrong, return an HTTP error.
		w.WriteHeader(http.StatusBadRequest)
		io.WriteString(w, "UNABLE TO PARSE JSON")
		return
	}

	// JSON BODY representing the credentials attribute to be used (i.e. either the credentials found in the token or inputted).
	creds := make(map[string]interface{})

	// JSON Body representing the credentials attribute with the following format: "credentials":{"scopes":[],...}
	// This is so to match with how the wrapper class will save the credentials file to memory.
	credsMap := make(map[string]interface{})

	// credsMap needs to nil if command type is reset, test, or info. Otherwise, credsMap will be chnage in the conditional statement that follows.
	credsMap = nil

	// If command type is test or token, credentials are not necessary
	if isCredentialsNeeded(requestBody.CommandType) {
		// Checking if there is a token to use if the user asks to use a token or a credential body. Will return an error if those components are missing.
		if (requestBody.UseToken && len(requestBody.Token) == 0) || (!requestBody.UseToken && len(requestBody.Credential) == 0) {
			w.WriteHeader(http.StatusBadRequest)
			if requestBody.UseToken {
				io.WriteString(w, "MiSSING TOKEN FILE")
			} else {
				io.WriteString(w, "MISSING CREDENTIALS FILE")
			}
			return
		}

		// Authenticating the token if requestBody.useToken is true and using uploadCredentials body in the token as the
		// uploadCredentials attribute in the WrapperCommand object.
		// Otherwise use the requestBody.Credentials as the uploadCredentials attribute in WrapperCommand object.
		if requestBody.UseToken {
			creds, err = authenticateCredentialsToken(requestBody.Token)
			if err != nil {
				w.WriteHeader(http.StatusUnauthorized)
				io.WriteString(w, strings.ToUpper(err.Error()))
				return
			}
		} else {
			creds = requestBody.Credential
		}

		// Putting the credentials file into a json format so to match with the format of the wrapper.
		credsJSON, err := json.Marshal(creds)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			io.WriteString(w, strings.ToUpper(err.Error()))
			return
		}

		credsMap = map[string]interface{}{
			"credential": string(credsJSON),
		}
	}

	// WrapperCommand object that will inputted into the wrapper.
	cmd := WrapperCommand{
		CommandType: requestBody.CommandType,
		Args:        requestBody.Args,
		Credential:  credsMap,
	}
	// Getting the response from the OAuth2l.
	CMDresponse := wrapperExecutor(cmd)

	// Getting a string representing the token created by the backend using the uploaded uploadCredentials file.
	credentialsToken := ""
	// Creating the token.
	if requestBody.CacheToken {
		credentialsToken, err = createCredentialsToken(creds)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			io.WriteString(w, strings.ToUpper(err.Error()))
			return
		}
	}

	// Writing response in json format.
	w.Header().Set("Content-Type", "application/json")
	responseBody := Response{
		OAuth2lResponse: CMDresponse,
		Token:           credentialsToken,
	}
	json.NewEncoder(w).Encode(responseBody)
}

func main() {
	router := mux.NewRouter()
	log.Println("Authorization Playground")
	// Used to serve React App in docker container.
	router.PathPrefix("/").Handler(http.StripPrefix("/", http.FileServer(http.Dir("./web"))))
	router.HandleFunc("/api", Handler)
	var srv = &http.Server{
		Handler:      router,
		Addr:         ":8080",
		WriteTimeout: 15 * time.Second,
		ReadTimeout:  15 * time.Second,
	}

	log.Fatal(srv.ListenAndServe())
}
