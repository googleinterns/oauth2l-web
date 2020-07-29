# OAuth2l Authentication Playground

The OAuth2l Authentication Playground is a web application where users can interact with the OAuth2l CLI tool using a GUI. Its primary use is to allow developers to interactively experiment with all the authentication flows and tokens supported in GCP.

## Overview
The Authentication Playground was designed to provide an intuitive and functional interface that will improve the experience for users interested in using the OAuth2l without being restricted to the CLI. The application is built on top of the OAuth2l, which allows it to inherit all its functionality and be adapted to fit future updates as well.

## Build Status
![GITHUB-BADGE](https://github.com/googleinterns/oauth2l-web/workflows/api/badge.svg) ![GITHUB-BADGE](https://github.com/googleinterns/oauth2l-web/workflows/client/badge.svg)

 ## Architecture
This application is built using  [React.JS](https://reactjs.org) on the frontend, themed with the [Material-UI](https://material-ui.com) library and uses [Go](https://golang.org) for the backend.

## Quickstart
First clone the repository using the following command:

```bash
$ git clone https://github.com/googleinterns/oauth2l-web
```
Then go into the `web` directory in your `oauth2l-web` directory.
```bash
$ cd oauth2l-web/web
```

### Docker
Download [Docker](https://docs.docker.com/get-docker/) if not already installed. 

#### Running the Web Application
Create the images for the backend and the frontend by running the following command:
```bash
$ docker-compose up -d --build .
```
The application should then be running on http://localhost:3000.

To stop the application, run the following commands:
```bash
$ docker-compose container stop
$ docker-compose container rm -f
```
#### Running just the Frontend or Backend
For the frontend, go into the `web/client` folder. For the backend, go into the `web/api` folder. Then to build the image, run the following command:

```bash
$ docker build -t oauth2l-web-<frontend/backend>
```
Then run the image with the following command:
```bash
$ docker run --detach --name oauth2l-web-frontend 3000:3000 -d oauth2l-web #frontend
$ docker run --detach --name oauth2l-web-backend 8080:8080 -d oauth2l-web #backend
```
To stop the image, run the following command
```bash
$ docker container stop oauth2l-web-<frontend/backend>
$ docker container rm oauth2l-web-<frontend/backend>
```
### Everywhere else
#### Requirements

The requirements needed to run the web application are:

| Requirements     | Link
| ------ | ---
| Node | https://nodejs.org/en/
| npm | https://www.npmjs.com/get-npm
| Golang | https://golang.org/dl/
| OAuth2l | https://github.com/google/oauth2l

#### Installing Packages

Go into your `web/api` directory and install the `go` libraries used in the application. 
```bash
$ cd web/api
$ go get .
```
Then go into the `web/client` directory and install the libaries used for the front-end.
```bash
$ cd web/client
$ npm install
```
#### Running the Application

To run the application, go into the `web/api` directory and run the two files `backend.go` and `wrapper.go`.
```bash
$ go run backend.go wrapper.go
```
Then, in a separate terminal, go into the `web/client` directory and then start the react app.
```bash
$ npm start
```
A webpage with the address `localhost:3000` should appear in a web browser page with the application running. 

## Testing
### Frontend
The unit tests for the frontend are written using [Jest](https://jestjs.io).
To run the tests, first go into the `web/client` directory and run the following command:
```bash
$ npm run test
```
### Backend
The unit for the backend are written using Go's libraries, [testing](https://golang.org/pkg/testing/) and [httptest](https://golang.org/pkg/net/http/httptest/).
To run the tests, first go into the `web/api` directory and run the following command:
```bash
$ go test
```
