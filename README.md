# go-microservice


Make sure you have docker, docker-compose, docker machine installed on your machine.*

<hr>

#### Steps to run *userservice*
1) `dep ensure` to install go dependencies
2) `docker-machine create dev` to create dev environment host
3) `eval "$(docker-machine env dev)"` to map host
4) `docker-compose up -d --build` to create and run containers
5) `docker-machine dev ip` to retrieve host ip addres

Use retrieved ip in order to make calls to the service.
