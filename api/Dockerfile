FROM golang:latest

# set working directory
ADD . /app/
WORKDIR /app

#installing backend dependencies 
ENV GOBIN /go/bin
RUN go get .
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -ldflags "-w" -a -o /main .

# add frontend
COPY . ./

# downloading python to get binary script
RUN apt-get update
RUN apt-get install -y python3

# exposing the backend port
EXPOSE 8080
RUN go build -o main .
# start backend
CMD ["./main"]