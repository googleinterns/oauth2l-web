package handler

import (
	"bytes"
	"net/http"
	"net/http/httptest"
	"reflect"
	"strings"
	"testing"
)

func TestHandlerAuthenticateCredentialsTokenValid(t *testing.T) {
	jsonStr := []byte(`{
        "commandtype":"fetch",
        "args":{
            "scope":["cloud-platform","userinfo.email"]
		},
        "credential": {
      "quota_project_id": "delays-or-traffi-1569131153704",
      "refresh_token": "1//0dFSxxi4NOTl2CgYIARAAGA0SNwF-L9Ira5YTnnFer1GCZBToGkwmVMAounGai_x4CgHwMAFgFNBsPSK5hBwxfpGn88u3roPrRcQ",
      "type": "authorized_user"
    },
    "cachetoken": false,
    "usetoken":true,
    "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVcGxvYWRDcmVkZW50aWFscyI6eyJxdW90YV9wcm9qZWN0X2lkIjoiZGVsYXlzLW9yLXRyYWZmaS0xNTY5MTMxMTUzNzA0IiwicmVmcmVzaF90b2tlbiI6IjEvLzBkRlN4eGk0Tk9UbDJDZ1lJQVJBQUdBMFNOd0YtTDlJcmE1WVRubkZlcjFHQ1pCVG9Ha3dtVk1Bb3VuR2FpX3g0Q2dId01BRmdGTkJzUFNLNWhCd3hmcEduODh1M3JvUHJSY1EiLCJ0eXBlIjoiYXV0aG9yaXplZF91c2VyIn0sImV4cCI6OTIyMzM3MTk3NDcxOTE3OTAwN30.qV78DszW3-c9g3LdT8uxOkgeufHg51QUhB2FjG2HmBY"
	}`)

	req, err := http.NewRequest("GET", "/", bytes.NewBuffer(jsonStr))
	if err != nil {
		t.Fatal(err)
	}
	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(Handler)

	// Our handlers satisfy http.Handler, so we can call their ServeHTTP method
	// directly and pass in our Request and ResponseRecorder.
	handler.ServeHTTP(rr, req)

	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusOK)
	}
}

func TestHandlerUseTokenWithoutToken(t *testing.T) {
	jsonStr := []byte(`{
        "commandtype":"fetch",
        "args":{
            "scope":["cloud-platform","userinfo.email"]
		},
        "credential": {
      "quota_project_id": "delays-or-traffi-1569131153704",
      "refresh_token": "1//0dFSxxi4NOTl2CgYIARAAGA0SNwF-L9Ira5YTnnFer1GCZBToGkwmVMAounGai_x4CgHwMAFgFNBsPSK5hBwxfpGn88u3roPrRcQ",
      "type": "authorized_user"
    },
    "cachetoken": false,
    "usetoken":true
	}`)

	req, err := http.NewRequest("GET", "/", bytes.NewBuffer(jsonStr))
	if err != nil {
		t.Fatal(err)
	}
	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(Handler)

	// Our handlers satisfy http.Handler, so we can call their ServeHTTP method
	// directly and pass in our Request and ResponseRecorder.
	handler.ServeHTTP(rr, req)

	if status := rr.Code; status != http.StatusBadRequest {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusBadRequest)
	}
	expected := "missing token file "
	if strings.Contains(rr.Body.String(), expected) {
		t.Errorf("handler returned unexpected body: got %v want %v",
			rr.Body.String(), expected)
	}
}

func TestHandlerUseTokenWithEmptyToken(t *testing.T) {
	jsonStr := []byte(`{
        "commandtype":"fetch",
        "args":{
            "scope":["cloud-platform","userinfo.email"]
		},
        "credential": {
      "quota_project_id": "delays-or-traffi-1569131153704",
      "refresh_token": "1//0dFSxxi4NOTl2CgYIARAAGA0SNwF-L9Ira5YTnnFer1GCZBToGkwmVMAounGai_x4CgHwMAFgFNBsPSK5hBwxfpGn88u3roPrRcQ",
      "type": "authorized_user"
    },
    "cachetoken": false,
    "usetoken":true,
    "token":""
	}`)

	req, err := http.NewRequest("GET", "/", bytes.NewBuffer(jsonStr))
	if err != nil {
		t.Fatal(err)
	}
	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(Handler)

	// Our handlers satisfy http.Handler, so we can call their ServeHTTP method
	// directly and pass in our Request and ResponseRecorder.
	handler.ServeHTTP(rr, req)

	if status := rr.Code; status != http.StatusBadRequest {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusBadRequest)
	}
	expected := "missing token file "
	if strings.Contains(rr.Body.String(), expected) {
		t.Errorf("handler returned unexpected body: got %v want %v",
			rr.Body.String(), expected)
	}
}

func TestHandlerUseTokenWithExpiredToken(t *testing.T) {
	jsonStr := []byte(`{
        "commandtype":"curl",
        "args":{
            "scope":["cloud-platform","userinfo.email"]
		},
        "credential": {
      "quota_project_id": "delays-or-traffi-1569131153704",
      "refresh_token": "1//0dFSxxi4NOTl2CgYIARAAGA0SNwF-L9Ira5YTnnFer1GCZBToGkwmVMAounGai_x4CgHwMAFgFNBsPSK5hBwxfpGn88u3roPrRcQ",
      "type": "authorized_user"
    },
    "cachetoken": true,
    "usetoken":true,
    "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVcGxvYWRDcmVkZW50aWFscyI6eyJxdW90YV9wcm9qZWN0X2lkIjoiZGVsYXlzLW9yLXRyYWZmaS0xNTY5MTMxMTUzNzA0IiwicmVmcmVzaF90b2tlbiI6IjEvLzBkRlN4eGk0Tk9UbDJDZ1lJQVJBQUdBMFNOd0YtTDlJcmE1WVRubkZlcjFHQ1pCVG9Ha3dtVk1Bb3VuR2FpX3g0Q2dId01BRmdGTkJzUFNLNWhCd3hmcEduODh1M3JvUHJSY1EiLCJ0eXBlIjoiYXV0aG9yaXplZF91c2VyIn0sImV4cCI6MTU5MzQ1OTk2MH0.jOHLb8x5G0aFyEo9DlNRfOddqPznxQB72f634KDTH9s"
	}`)

	req, err := http.NewRequest("GET", "/", bytes.NewBuffer(jsonStr))
	if err != nil {
		t.Fatal(err)
	}

	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(Handler)
	// Our handlers satisfy http.Handler, so we can call their ServeHTTP method
	// directly and pass in our Request and ResponseRecorder.
	handler.ServeHTTP(rr, req)

	if status := rr.Code; status != http.StatusUnauthorized {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusUnauthorized)
	}
	expected := "Token is expired "
	if strings.Contains(rr.Body.String(), expected) {
		t.Errorf("handler returned unexpected body: got %v want %v",
			rr.Body.String(), expected)
	}
}

func TestHandlerUseTokenWithTokenSignatureInvalid(t *testing.T) {
	jsonStr := []byte(`{
        "commandtype":"curl",
        "args":{
            "scope":["cloud-platform","userinfo.email"]
		},
        "credential": {
      "quota_project_id": "delays-or-traffi-1569131153704",
      "refresh_token": "1//0dFSxxi4NOTl2CgYIARAAGA0SNwF-L9Ira5YTnnFer1GCZBToGkwmVMAounGai_x4CgHwMAFgFNBsPSK5hBwxfpGn88u3roPrRcQ",
      "type": "authorized_user"
    },
    "cachetoken": true,
    "usetoken":true,
    "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVcGxvYWRDcmVkZW50aWFscyI6eyJxdW90YV9wcm9qZWN0X2lkIjoiZGVsYXlzLW9yLXRyYWZmaS0xNTY5MTMxMTUzNzA0IiwicmVmcmVzaF90b2tlbiI6IjEvLzBkRlN4eGk0Tk9UbDJDZ1lJQVJBQUdBMFNOd0YtTDlJcmE1WVRubkZlcjFHQ1pCVG9Ha3dtVk1Bb3VuR2FpX3g0Q2dId01BRmdGTkJzUFNLNWhCd3hmcEduODh1M3JvUHJSY1EiLCJ0eXBlIjoiYXV0aG9yaXplZF91c2VyIn0sImV4cCI6MTU5MzQ1OTk2MH0.jOHLb8x5G0aFyEo9DlNRfOddqPznxQB72f634KDTI9s"
	}`)

	req, err := http.NewRequest("GET", "/", bytes.NewBuffer(jsonStr))
	if err != nil {
		t.Fatal(err)
	}

	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(Handler)

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

func TestHandlerCacheTokenWithNoCredentials(t *testing.T) {

	jsonStr := []byte(`{
        "commandtype":"curl",
        "args":{
            "scope":["cloud-platform","userinfo.email"]
		},
    "cachetoken": true,
    "usetoken":false
	}`)

	req, err := http.NewRequest("GET", "/", bytes.NewBuffer(jsonStr))
	if err != nil {
		t.Fatal(err)
	}

	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(Handler)
	// Our handlers satisfy http.Handler, so we can call their ServeHTTP method
	// directly and pass in our Request and ResponseRecorder.
	handler.ServeHTTP(rr, req)

	if status := rr.Code; status != http.StatusBadRequest {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusBadRequest)
	}
	expected := "missing credentials file"
	if rr.Body.String() != expected {
		t.Errorf("handler returned unexpected body: got %v want %v",
			rr.Body.String(), expected)
	}
}

func TestHandlerCacheTokenEmptyCredentials(t *testing.T) {
	jsonStr := []byte(`{
        "commandtype":"curl",
        "args":{
            "scope":["cloud-platform","userinfo.email"]
		},
        "credential": {},
    "cachetoken": true,
    "usetoken":false
	}`)

	req, err := http.NewRequest("GET", "/", bytes.NewBuffer(jsonStr))
	if err != nil {
		t.Fatal(err)
	}

	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(Handler)

	// Our handlers satisfy http.Handler, so we can call their ServeHTTP method
	// directly and pass in our Request and ResponseRecorder.
	handler.ServeHTTP(rr, req)

	if status := rr.Code; status != http.StatusBadRequest {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusBadRequest)
	}
	expected := "missing credentials file"
	if rr.Body.String() != expected {
		t.Errorf("handler returned unexpected body: got %v want %v",
			rr.Body.String(), expected)
	}

}

func TestHandlerCreateCredentialsToken(t *testing.T) {

	jsonStr := []byte(`{
        "commandtype":"curl",
        "args":{
            "scope":["cloud-platform","userinfo.email"]
		},
        "credential": {
      "quota_project_id": "delays-or-traffi-1569131153704",
      "refresh_token": "1//0dFSxxi4NOTl2CgYIARAAGA0SNwF-L9Ira5YTnnFer1GCZBToGkwmVMAounGai_x4CgHwMAFgFNBsPSK5hBwxfpGn88u3roPrRcQ",
      "type": "authorized_user"
    },
    "cachetoken": true,
    "usetoken":false
	}`)

	req, err := http.NewRequest("GET", "/", bytes.NewBuffer(jsonStr))
	if err != nil {
		t.Fatal(err)
	}

	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(Handler)

	// Our handlers satisfy http.Handler, so we can call their ServeHTTP method
	// directly and pass in our Request and ResponseRecorder.
	handler.ServeHTTP(rr, req)

	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusOK)
	}
}

func TestHandlerCreateCredentialsTokenWithNoCredentials(t *testing.T) {

	jsonStr := []byte(`{
        "commandtype":"curl",
        "args":{
            "scope":["cloud-platform","userinfo.email"]
		},
    "cachetoken": true,
    "usetoken":false
	}`)

	req, err := http.NewRequest("GET", "/", bytes.NewBuffer(jsonStr))
	if err != nil {
		t.Fatal(err)
	}

	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(Handler)

	// Our handlers satisfy http.Handler, so we can call their ServeHTTP method
	// directly and pass in our Request and ResponseRecorder.
	handler.ServeHTTP(rr, req)

	if status := rr.Code; status != http.StatusBadRequest {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusBadRequest)
	}
}

func TestHandlerCreateCredentialsTokenWithEmptyCredentials(t *testing.T) {

	jsonStr := []byte(`{
        "commandtype":"curl",
        "args":{
            "scope":["cloud-platform","userinfo.email"]
		},
        "credential": {},
    "cachetoken": true,
    "usetoken":false
	}`)

	req, err := http.NewRequest("GET", "/", bytes.NewBuffer(jsonStr))
	if err != nil {
		t.Fatal(err)
	}

	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(Handler)

	// Our handlers satisfy http.Handler, so we can call their ServeHTTP method
	// directly and pass in our Request and ResponseRecorder.
	handler.ServeHTTP(rr, req)

	if status := rr.Code; status != http.StatusBadRequest {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusBadRequest)
	}
}

func TestHandlerNoCreateCredentialsTokenNoUseToken(t *testing.T) {

	jsonStr := []byte(`{
        "commandtype":"curl",
        "args":{
            "scope":["cloud-platform","userinfo.email"]
		},
        "credential": {
      "quota_project_id": "delays-or-traffi-1569131153704",
      "refresh_token": "1//0dFSxxi4NOTl2CgYIARAAGA0SNwF-L9Ira5YTnnFer1GCZBToGkwmVMAounGai_x4CgHwMAFgFNBsPSK5hBwxfpGn88u3roPrRcQ",
      "type": "authorized_user"
    },
    "cachetoken": false,
    "usetoken":false
	}`)

	req, err := http.NewRequest("GET", "/", bytes.NewBuffer(jsonStr))
	if err != nil {
		t.Fatal(err)
	}

	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(Handler)

	// Our handlers satisfy http.Handler, so we can call their ServeHTTP method
	// directly and pass in our Request and ResponseRecorder.
	handler.ServeHTTP(rr, req)

	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusOK)
	}
}
