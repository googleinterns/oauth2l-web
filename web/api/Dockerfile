FROM golang:latest

ADD . /app/
WORKDIR /app

RUN go get .
EXPOSE 8080
CMD ["go", "run", "backend.go", "wrapper.go"]