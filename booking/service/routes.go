package service

import (
	"github.com/ismayilmalik/go-microservice-project/booking/handler"
	"net/http"
)

type Route struct {
	Name string
	Method string
	Pattern string
	HandlerFunc http.HandlerFunc
}

type Routes []Route

var routes = Routes {
	Route {
		"Hello",
		"GET",
		"/hello",
		func(w http.ResponseWriter, r *http.Request) {
			w.WriteHeader(http.StatusOK)
			w.Write([]byte("Hello"))
		},
	},
	Route {
		"AddBooking",
		"POST",
		"/bookings",
		handler.Create,
	},
}