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
	"os/exec"
	"io/ioutil"
	"runtime"
	"log"
)

const (
	defaultServer = "http://localhost:3000/"
)

//Runs the frontend/backend for OAuth2l Playground
func Web() {
	_,err :=ioutil.ReadDir("web")
	if err != nil {
		fmt.Println("Currently Web is not installed, updating repository.")
		cmd := exec.Command("git","clone", "https://github.com/google/oauth2l.git")
		cmd.Run()

	}
	cmd := exec.Command("docker-compose", "up", "-d", "--build")
	cmd.Dir = "web"
	output, err := cmd.CombinedOutput()
	fmt.Println("Fnished Process")
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
