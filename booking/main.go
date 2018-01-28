package main

import (
	"github.com/ismayilmalik/go-microservice-project/booking/db"
	"github.com/ismayilmalik/go-microservice-project/booking/service"
	"fmt"
)

var appName = "bookingApi"

func main()  {
	db.InitializeDb()
	defer db.DisposeDb()

	fmt.Printf("Starting app: %s", appName)
	service.StartWebServer("5000")
}