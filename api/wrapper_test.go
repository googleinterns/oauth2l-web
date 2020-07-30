package main

import (
	"encoding/json"
	"io/ioutil"
	"os"
	"os/exec"
	"reflect"
	"testing"
)

func TestMain(m *testing.M) {
	cmd := exec.Command("python3", "get_binaries.py")
	err := cmd.Run()
	if err != nil {
		os.Exit(1)
	}
	os.Exit(m.Run())

}

func TestWrapperCommandStructSingleArg(t *testing.T) {
	const expectedRequest = "test"
	var expectedArgs = Args{"flag": "value"}

	wrapper := WrapperCommand{
		expectedRequest,
		expectedArgs,
		Credential{},
		"",
	}

	if wrapper.CommandType != expectedRequest {
		t.Errorf("expected request value incorrect")
	}

	if !reflect.DeepEqual(wrapper.Args, expectedArgs) {
		t.Errorf("expected args are not correct")
	}
}

func TestWrapperCommandStructManyArgs(t *testing.T) {
	const expectedRequest = "test"
	var expectedArgs = Args{"flag": []string{"value1", "value2"}}

	wrapper := WrapperCommand{
		expectedRequest,
		expectedArgs,
		Credential{},
		"",
	}

	if wrapper.CommandType != expectedRequest {
		t.Errorf("expected request value incorrect")
	}

	if !reflect.DeepEqual(wrapper.Args, expectedArgs) {
		t.Errorf("expected args are not correct")
	}
}

func TestInvalidTypeInArgs(t *testing.T) {
	const expectedRequest = "test"
	var expectedArgs = Args{"flag": []int{2, 3}}

	wrapper := WrapperCommand{
		expectedRequest,
		expectedArgs,
		nil,
		"",
	}

	_, err := wrapper.Execute()

	if err.Error() != "invalid type found in args" {
		t.Errorf("invalid types not detected")
	}
}

func TestValidTypeInArgs(t *testing.T) {
	const expectedRequest = "test"
	var expectedArgs = Args{"flag": []string{"test"}}

	wrapper := WrapperCommand{
		expectedRequest,
		expectedArgs,
		nil,
		"",
	}

	_, err := combinedArgs(wrapper)

	if err != nil {
		t.Errorf("valid types not detected")
	}
}

func TestJSONValidTypeInArgs(t *testing.T) {
	wrapper := WrapperCommand{}

	jsonString := []byte(`{
        "commandType": "fetch",
        "args": {
            "--scope": ["cloud-platform","userinfo.email"]
		},
		"body": {}
	}`)

	json.Unmarshal(jsonString, &wrapper)

	_, err := wrapper.Execute()

	if err != nil {
		t.Errorf("valid types not detected")
	}
}

func TestJSONInvalidTypeInArgs(t *testing.T) {
	wrapper := WrapperCommand{}

	jsonString := []byte(`{
        "commandType": "fetch",
        "args": {
            "--scope": 2
		},
		"body": {}
	}`)

	json.Unmarshal(jsonString, &wrapper)

	_, err := wrapper.Execute()

	if err.Error() != "invalid type found in args" {
		t.Errorf("invalid types not detected")
	}
}

func TestJSONValueInArgs(t *testing.T) {
	wrapper := WrapperCommand{}

	jsonString := []byte(`{
        "commandType": "fetch",
        "args": {
            "--scope": ["cloud-platform", "userinfo.email"]
		},
		"body": {}
	}`)

	json.Unmarshal(jsonString, &wrapper)

	flattenedArgs, _ := combinedArgs(wrapper)

	if !reflect.DeepEqual(flattenedArgs, []string{"fetch", "--scope", "cloud-platform", "userinfo.email"}) {
		t.Errorf("flattened values not correct")
	}
}

func TestDummyOauth2lCommand(t *testing.T) {
	const expectedRequest = "test"
	var expectedArgs = Args{"--token": "ya29.justkiddingmadethisoneup"}

	wrapper := WrapperCommand{
		expectedRequest,
		expectedArgs,
		nil,
		"",
	}

	output, _ := wrapper.Execute()
	if output != "1" {
		t.Errorf("error running dummy command")
	}
}

func TestTokenCreationCredential(t *testing.T) {
	cred := Credential{"credential": `{
		"quota_project_id": "delays-or-traffi-1569131153704",
		"refresh_token": "1//0dFSxxi4NOTl2CgYIARAAGA0SNwF-L9Ira5YTnnFer1GCZBToGkwmVMAounGai_x4CgHwMAFgFNBsPSK5hBwxfpGn88u3roPrRcQ",
		"type": "authorized_user"
	  }`}

	wrapper := WrapperCommand{
		"fetch",
		Args{"--scope": []string{"cloud-platform"}},
		cred,
		"",
	}

	_, err := wrapper.Execute()

	if err != nil {
		t.Errorf("error creating token")
	}
}

func TestCredentialFileCreation(t *testing.T) {
	cred := Credential{"credential": `{
		"client_id": "some",
		"client_secret": "random",
		"refresh_token": "test",
		"type": "code"
		}`}

	_, err := allocateMemFile(cred)

	if err != nil {
		t.Errorf("error creating file")
	}
}

func TestCredentialPath(t *testing.T) {
	cred := Credential{"credential": `{
		"client_id": "some",
		"client_secret": "random",
		"refresh_token": "test",
		"type": "code"
		}`}

	path, err := getCredentialPath(cred)

	if err != nil || path == "" {
		t.Errorf("error generating path")
	}
}

func TestCredentialFileContents(t *testing.T) {
	cred := Credential{"credential": `{
		"client_id": "some",
		"client_secret": "random",
		"refresh_token": "test",
		"type": "code"
		}`}

	path, err := getCredentialPath(cred)

	fileBytes, err := ioutil.ReadFile(path)

	if err != nil {
		t.Errorf("error reading from file")
	}

	fileStr := string(fileBytes)

	if fileStr != cred["credential"].(string) {
		t.Errorf("file contents do not match")
	}
}
