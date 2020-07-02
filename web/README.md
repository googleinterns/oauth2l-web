# OAuth2l Authentication Playground

The Oauth2l Authentication Playground is a web application in which users can use to interact with the OAuth2l CLI tool using a GUI. Its primary use is to allow developers to interactively experiment with all the Auth flows and Auth tokens supported in GCP.

## Overview
The Authentication Playground was designed to provide an intuitive and functional interface that will improve the experience of user interested in using the OAuth2l tool without being restricted to the OAuth2l, as the tool may be difficult to interact with due to the abstracted way its commands work and fit together. The application is built on top of the OAUth2l tool, which allows application to have the complete functionality of the tool and can be adapted to fit future adaptations of the tool.

## Build Status
![GITHUB-BADGE](https://github.com/googleinterns/oauth2l-web/workflows/api/badge.svg)

 ## Architecture
This application is built using  React.JS](https://reactjs.org) on the frontend with the [Material-UI](https://material-ui.com) library and  [Go](https://golang.org) on the backend.

## Quickstart

### Deploying Locally
#### Requirements

The requirements needed to run the web application are:

| Requirements     | Link
| ------ | ---
| Node | https://nodejs.org/en/
| Golang | https://golang.org/dl/
| Oauth2l | https://github.com/google/oauth2l

#### Installing Packages

First clone the repository using the following command:

```bash
$ git clone https://github.com/google/oauth2l
```
Then go into your oauth2l directory and install the go libraries used in the application. 
```bash
$ cd oauth2l
$ go get
```
Go into the web/client directory. If you don't have React.JS, install it with the following command:
```bash
$ npm install react --save
```
 Then install the libaries used in the front-end of the application.
```bash
$ cd web/api
$ npm install
```
#### Running the Application

To run the application, go into the `web/api` directory and run the two files `backend.go` and `wrapper.go`.
```bash
$ cd .../web/api
$ go run backend.go wrapper.go
```
Then go into the `web/client` directory and then start the react app.
```bash
$ cd .../web/client
$ npm start
```
A webpage with the address `localhost:3000` should appear in a web browser page with application running on it. 

## Testing
### Frontend
The unit tests for the frontend are written using [Jest](https://jestjs.io).
To run the tests, first go into the `web/client` directory and run the following command:
```bash
$ npm run test
```
### Backend
The unit for the backend are written using Go's [testing](https://golang.org/pkg/testing/) library and [httptest](https://golang.org/pkg/net/http/httptest/) library.
To run the tests, first go into the `web/api` directory and run the following command:
```bash
$ go test
```