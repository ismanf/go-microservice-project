package main

import (
	"log"

	"github.com/streadway/amqp"
	"gopkg.in/mgo.v2"
)

func main() {
	initConfig()

	db, err := mgo.Dial(config.DB.Host)
	checkError(err)
	defer db.Close()

	conn, err := amqp.Dial(config.AMQP.Url)
	checkError(err)
	defer conn.Close()

	ch, err := conn.Channel()
	checkError(err)
	defer ch.Close()

	a := &App{}
	a.Initialize(db, ch)
	a.Run(config.SVC.Addr)
}

func checkError(err error) {
	if err != nil {
		log.Fatal(err)
	}
}
