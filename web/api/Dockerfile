FROM golang:latest

# set working directory
ADD . /app/
WORKDIR /app

#installing backend dependencies 
RUN go get .

# add frontend
COPY . ./

# exposing the backend port
EXPOSE 8080

# start backend
CMD ["go", "run", "backend.go", "wrapper.go"]