package main

import (
	"bytes"
	"net/http"
	"net/http/httptest"
	"reflect"
	"testing"
)

func TestAuthHandlerValid(t *testing.T) {
	jsonStr := []byte(`{
        "requesttype":"fetch",
        "args":{
            "scope":["cloud-platform","userinfo.email"]
		},
        "credential": {
      "quota_project_id": "delays-or-traffi-1569131153704",
      "refresh_token": "1//0dFSxxi4NOTl2CgYIARAAGA0SNwF-L9Ira5YTnnFer1GCZBToGkwmVMAounGai_x4CgHwMAFgFNBsPSK5hBwxfpGn88u3roPrRcQ",
      "type": "authorized_user"
    }
	}`)
	req, err := http.NewRequest("GET", "/auth", bytes.NewBuffer(jsonStr))
	if err != nil {
		t.Fatal(err)
	}

	req.Header.Set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJCb2R5Ijp7ImNsaWVudF9pZCI6Ijc2NDA4NjA1MTg1MC02cXI0cDZncGk2aG41MDZwdDhlanVxODNkaTM0MWh1ci5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsImNsaWVudF9zZWNyZXQiOiJkLUZMOTVRMTlxN01RbUZwZDdoSEQwVHkiLCJxdW90YV9wcm9qZWN0X2lkIjoiZGVsYXlzLW9yLXRyYWZmaS0xNTY5MTMxMTUzNzA0IiwicmVmcmVzaF90b2tlbiI6IjEvLzBkRlN4eGk0Tk9UbDJDZ1lJQVJBQUdBMFNOd0YtTDlJcmE1WVRubkZlcjFHQ1pCVG9Ha3dtVk1Bb3VuR2FpX3g0Q2dId01BRmdGTkJzUFNLNWhCd3hmcEduODh1M3JvUHJSY1EiLCJ0eXBlIjoiYXV0aG9yaXplZF91c2VyIn19.OSNSv1HGq1C9sbtS7lSU4zRiMURNsbV9QuMOKj2sK6s")
	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(AuthHandler)

	// Our handlers satisfy http.Handler, so we can call their ServeHTTP method
	// directly and pass in our Request and ResponseRecorder.
	handler.ServeHTTP(rr, req)

	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusOK)
	}
}

func TestAuthHandlerExpired(t *testing.T) {
	req, err := http.NewRequest("GET", "/auth", nil)

	if err != nil {
		t.Fatal(err)
	}
	req.Header.Set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJCb2R5Ijp7ImNsaWVudF9pZCI6Ijc2NDA4NjA1MTg1MC02cXI0cDZncGk2aG41MDZwdDhlanVxODNkaTM0MWh1ci5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsImNsaWVudF9zZWNyZXQiOiJkLUZMOTVRMTlxN01RbUZwZDdoSEQwVHkiLCJxdW90YV9wcm9qZWN0X2lkIjoiZGVsYXlzLW9yLXRyYWZmaS0xNTY5MTMxMTUzNzA0IiwicmVmcmVzaF90b2tlbiI6IjEvLzBkRlN4eGk0Tk9UbDJDZ1lJQVJBQUdBMFNOd0YtTDlJcmE1WVRubkZlcjFHQ1pCVG9Ha3dtVk1Bb3VuR2FpX3g0Q2dId01BRmdGTkJzUFNLNWhCd3hmcEduODh1M3JvUHJSY1EiLCJ0eXBlIjoiYXV0aG9yaXplZF91c2VyIn0sImV4cCI6MTU5MjQzNDk4NH0.r9S5GIqtvrXv602lFifGcI8PTMroDx3R1R0FpN7eVZE")
	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(AuthHandler)
	// Our handlers satisfy http.Handler, so we can call their ServeHTTP method
	// directly and pass in our Request and ResponseRecorder.
	handler.ServeHTTP(rr, req)

	if status := rr.Code; status != http.StatusUnauthorized {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusUnauthorized)
	}
	expected := "Token is expired "
	if reflect.DeepEqual(rr.Body.String(), expected) {
		t.Errorf("handler returned unexpected body: got %v want %v",
			rr.Body.String(), expected)
	}
}

func TestAuthHandlerIllegal(t *testing.T) {
	req, err := http.NewRequest("GET", "/auth", nil)

	if err != nil {
		t.Fatal(err)
	}
	req.Header.Set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJCb2R5Ijp7ImNsaWVudF9pZCI6Ijc2NDA4NjA1MTg1MC02cXI0cDZncGk2aG41MDZwdDhlanVxODNkaTM0MWh1ci5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsImNsaWVudF9zZWNyZXQiOiJkLUZMOTVRMTlxN01RbUZwZDdoSEQwVHkiLCJxdW90YV9wcm9qZWN0X2lkIjoiZGVsYXlzLW9yLXRyYWZmaS0xNTY5MTMxMTUzNzA0IiwicmVmcmVzaF90b2tlbiI6IjEvLzBkRlN4eGk0Tk9UbDJDZ1lJQVJBQUdBMFNOd0YtTDlJcmE1WVRubkZlcjFHQ1pCVG9Ha3dtVk1Bb3VuR2FpX3g0Q2dId01BRmdGTkJzUFNLNWhCd3hmcEduODh1M3JvUHJSY1EiLCJ0eXBlIjoiYXV0aG9yaXplZF91c2VyIn0sImV4cCI6MTU5MjQ1NTA0MH0.s5ndK3lzwV7DNUGnzd0-lzfPl6nIxgas6-5Y0-Y576")
	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(AuthHandler)

	// Our handlers satisfy http.Handler, so we can call their ServeHTTP method
	// directly and pass in our Request and ResponseRecorder.
	handler.ServeHTTP(rr, req)

	if status := rr.Code; status != http.StatusUnauthorized {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusUnauthorized)
	}

	expected := "signature is invalid "
	if reflect.DeepEqual(rr.Body.String(), expected) {
		t.Errorf("handler returned unexpected body: got %v want %v",
			rr.Body.String(), expected)
	}
}

func TestTokenHandlerNoCredentials(t *testing.T) {

	jsonStr := []byte(`{
        "requesttype":"fetch",
        "args":{
            "scope":["cloud-platform","userinfo.email"]
		}
    }`)

	req, err := http.NewRequest("GET", "/credentials", bytes.NewBuffer(jsonStr))
	if err != nil {
		t.Fatal(err)
	}
	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(CredentialsHandler)

	// Our handlers satisfy http.Handler, so we can call their ServeHTTP method
	// directly and pass in our Request and ResponseRecorder.
	handler.ServeHTTP(rr, req)

	if status := rr.Code; status != http.StatusBadRequest {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusBadRequest)
	}
	expected := `{"error":"cannot make token without credentials"}`
	if rr.Body.String() != expected {
		t.Errorf("handler returned unexpected body: got %v want %v",
			rr.Body.String(), expected)
	}
}

func TestTokenHandlerEmptyUploadCredentials(t *testing.T) {
	jsonStr := []byte(`{
        "requesttype":"fetch",
        "args":{
            "scope":["cloud-platform","userinfo.email"]

		},
		"uploadcredentials":{}
    }`)

	req, err := http.NewRequest("GET", "/credentials", bytes.NewBuffer(jsonStr))

	if err != nil {
		t.Fatal(err)
	}
	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(CredentialsHandler)

	// Our handlers satisfy http.Handler, so we can call their ServeHTTP method
	// directly and pass in our Request and ResponseRecorder.
	handler.ServeHTTP(rr, req)

	if status := rr.Code; status != http.StatusBadRequest {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusBadRequest)
	}
	expected := `{"error":"cannot make token without credentials"}`
	if rr.Body.String() != expected {
		t.Errorf("handler returned unexpected body: got %v want %v",
			rr.Body.String(), expected)
	}

}

func TestTokenHandlerNoCreation(t *testing.T) {
	jsonStr := []byte(`{
        "requesttype":"fetch",
        "args":{
            "scope":["cloud-platform","userinfo.email"]
		}
    }`)

	req, err := http.NewRequest("GET", "/nocredentials", bytes.NewBuffer(jsonStr))
	if err != nil {
		t.Fatal(err)
	}
	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(NoCredentialsHandler)

	// Our handlers satisfy http.Handler, so we can call their ServeHTTP method
	// directly and pass in our Request and ResponseRecorder.
	handler.ServeHTTP(rr, req)

	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusOK)
	}
}

func TestTokenHandlerValidWithCreation(t *testing.T) {

	jsonStr := []byte(`{
        "requesttype":"fetch",
        "args":{
            "scope":["cloud-platform","userinfo.email"]
		},
        "credential": {
      "quota_project_id": "delays-or-traffi-1569131153704",
      "refresh_token": "1//0dFSxxi4NOTl2CgYIARAAGA0SNwF-L9Ira5YTnnFer1GCZBToGkwmVMAounGai_x4CgHwMAFgFNBsPSK5hBwxfpGn88u3roPrRcQ",
      "type": "authorized_user"
    }
    }`)

	req, err := http.NewRequest("GET", "/credentials", bytes.NewBuffer(jsonStr))

	if err != nil {
		t.Fatal(err)
	}
	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(CredentialsHandler)

	// Our handlers satisfy http.Handler, so we can call their ServeHTTP method
	// directly and pass in our Request and ResponseRecorder.
	handler.ServeHTTP(rr, req)

	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusOK)
	}
}
