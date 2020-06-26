package main

import (
	"errors"
	"fmt"
	"os/exec"
	"strings"

	"golang.org/x/sys/unix"
)

// WrapperCommand represents components necessary for OAuth2l request
type WrapperCommand struct {
	CommandType string
	Args
	Credential
}

// Args type used for unmarshalled JSON
type Args map[string]interface{}

// Credential type used for storing JSON-formatted credentials
type Credential map[string]interface{}

// Execute invokes OAuth2l CLI with the arguments from WrapperCommand.
// The output of the CLI is captured and returned as a string.
func (wc WrapperCommand) Execute() (output string, err error) {
	// combinedArgs used to represent command arguments in flattened array
	args, err := combinedArgs(wc)

	if err != nil {
		return "", err
	}

	// Check if credential is provided to include in oauth2l command
	if wc.Credential != nil {
		// Symlink path to memory file
		path, err := getCredentialPath(wc.Credential)

		if err != nil {
			return "", err
		}

		args = append(args, "--credentials", path)
	}

	// Execute command and capture output
	command := exec.Command("oauth2l", args...)
	byteBuffer, err := command.Output()

	// Convert byteBuffer to string and remove newline character
	output = strings.TrimSuffix(string(byteBuffer), "\n")
	
	return output, err
}

// Accepted argument types are string, []string, and []interface{}
// Examples:
// 		   string: "test"
// 	     []string: ["test1", "test2"]
// 	[]interface{}: [{0: "test1"}, {1: "test2"}] - this is the default JSON decoded format
func combinedArgs(wc WrapperCommand) (combinedArgs []string, err error) {
	combinedArgs = append(combinedArgs, wc.CommandType)

	for flag, value := range wc.Args {
		combinedArgs = append(combinedArgs, flag)
		
		// Assert args are of accepted types
		switch value := value.(type) {
		case []string:
			combinedArgs = append(combinedArgs, value...)
		case string:
			combinedArgs = append(combinedArgs, value)
		case []interface{}:
			for _, subValue := range value {
				combinedArgs = append(combinedArgs, subValue.(string))
			}
		default:
			return nil, errors.New("invalid type found in args")
		}
	}
	return combinedArgs, nil
}

func getCredentialPath(credential Credential) (path string, err error) {
	// Gets a file descriptor for a memory allocated credential file.
	// Memory allocation is used rather than disk space to improve security
	// (e.g. a delete operation fails to remove a credential from the disk).
	descriptor, err := allocateMemFile(credential)

	if err != nil {
		return "", err
	}

	path = fmt.Sprintf("/proc/self/fd/%d", descriptor)

	return path, nil
}

func allocateMemFile(credential Credential) (descriptor int, err error) {
	// Init cred with credential body
	cred := credential["credential"]

	byteArray := []byte(cred.(string))

	// Create an anonymous file on the RAM, once all references to descriptor are dropped, file is released
	descriptor, err = unix.MemfdCreate("credential", 0)

	if err != nil {
		return 0, err
	}

	// Truncate file size to match size of our credential body
	err = unix.Ftruncate(descriptor, int64(len(byteArray)))
	if err != nil {
		return 0, err
	}

	// Map file to memory and assign virtual address
	addr, err := unix.Mmap(descriptor, 0, len(byteArray), unix.PROT_READ|unix.PROT_WRITE, unix.MAP_SHARED)
	if err != nil {
		return 0, err
	}

	// Copy credential body into allocated memory
	copy(addr, byteArray)

	// Delete data memory mapping as body is now written to memory
	err = unix.Munmap(addr)
	if err != nil {
		return 0, err
	}

	// Returns file descriptor
	return descriptor, nil
}
