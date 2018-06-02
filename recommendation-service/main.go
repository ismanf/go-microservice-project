package main

import (
	"log"
	"gopkg.in/mgo.v2"
)

func main() {
	
	db, err := mgo.Dial("localhost")
	checkError(err)
	defer db.Close()

	a := &App{}
	a.Initialize(db)

}

func checkError(err error) {
	if err != nil {
		log.Fatal(err)
	}
}