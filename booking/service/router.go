package service

import (
	"github.com/gorilla/mux"
)

func NewRouter() *mux.Router {
	router := mux.NewRouter().StrictSlash(true)

	for _, r := range routes {
		router.Methods(r.Method).Name(r.Name).Path(r.Pattern).Handler(r.HandlerFunc)
	}

	return router
}