package db

import (
	"errors"
	"log"

	"gopkg.in/mgo.v2"
)

var sessionInstance *mgo.Session
var initialized, disposed bool

func InitializeDb() {
	if initialized {
		return
	}

	session, err := mgo.Dial("localhost")
	if err != nil {
		log.Println("Db failed initialization: " + err.Error())
	}

	session.SetMode(mgo.Monotonic, true)
	sessionInstance = session
	initialized = true
}

func NewSession() (*mgo.Session, error) {
	if !initialized {
		return nil, errors.New("Session is not initialized")
	}

	return sessionInstance.Clone(), nil
}

func DisposeDb() {
	if disposed {
		return
	}
	
	sessionInstance.Close()
	disposed = true
}
