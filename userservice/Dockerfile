# UserService Dockerfile
FROM golang:latest
LABEL Name="userservice" Version=0.1.1

# make workspace directories
RUN mkdir -p /go/src \
 && mkdir -p /go/bin \
 && mkdir -p /go/pkg

# set env vars
ENV GOPATH=/go
ENV PATH=$GOPATH/bin:$PATH

# set app path and copy source
RUN mkdir -p $GOPATH/src/app
ADD . $GOPATH/src/app
WORKDIR $GOPATH/src/app

# build and run
RUN go build -o main .
CMD ["/go/src/app/main -cache_enabled=true"]

# expose port
EXPOSE 5000


