package service

import (
	"net/http"
	"log"
)

func StartWebServer(port string)  {

	router := NewRouter()
	http.Handle("/", router)

	log.Println("Starting server at port" + port)
	if err := http.ListenAndServe(":"+ port, nil); err != nil {
		log.Println("Service can't be started:" + err.Error())
	}
}