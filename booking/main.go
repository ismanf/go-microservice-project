package main

import (
	"github.com/ismayilmalik/go-microservice-project/booking/service"
	"fmt"
)

var appName = "bookingApi"

func main()  {
	fmt.Printf("Starting app: %s", appName)
	service.StartWebServer("5000")
}