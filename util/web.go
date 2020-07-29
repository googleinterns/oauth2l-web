//
// Copyright 2018 Google Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
package util

import (
	"fmt"
	"log"
	"os"
	"os/exec"
	"runtime"
)

const (
	defaultServer = "http://localhost:3000/"
)

//Runs the frontend/backend for OAuth2l Playground
func Web() {
	if _, err := os.Stat("./oauth2l-web"); os.IsNotExist(err) { // not done, this is not what we want
		fmt.Println("Currently Web is not installed, updating repository.")
		cmd := exec.Command("go", "get", "https://github.com/googleinterns/oauth2l-web.git")
		cmd.Run()
		fmt.Println("Web binary installed")

	}
	cmd := exec.Command("docker-compose", "up", "-d", "--build")
	cmd.Dir = "web"
	output, err := cmd.CombinedOutput()

	if err != nil {
		fmt.Println(string(cmd.Dir))
		fmt.Println(fmt.Sprint(err) + ": " + string(output))
		log.Fatal(err)
	} else {
		openWeb()
	}
}

//opens the website on the default browser
func openWeb() error {
	var cmd string

	switch runtime.GOOS {
	case "darwin":
		cmd = "open"
	case "linux":
		cmd = "xdg-open"
	case "windows":
		cmd = "start"
	default:
		cmd = "Not currently supported"
	}

	return exec.Command(cmd, defaultServer).Start()
}
