package handler

import (
	"strconv"
	"gopkg.in/mgo.v2/bson"
	"github.com/ismayilmalik/go-microservice-project/booking/db"
	"encoding/json"
	"github.com/ismayilmalik/go-microservice-project/booking/model"
	"net/http"
)

func Create(w http.ResponseWriter, r *http.Request)  {
	var m model.Booking

	err := json.NewDecoder(r.Body).Decode(&m)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	var session, _ = db.NewSession()
	defer session.Close()

	c := session.DB("booking").C("bookings")
	m.ID = bson.NewObjectId()
	err = c.Insert(m)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(err.Error()))
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
}


func GetAll(w http.ResponseWriter, r *http.Request)  {
	var m model.Bookings

	var session, _ = db.NewSession()
	defer session.Close()

	c := session.DB("booking").C("bookings")
	c.Find(bson.M{}).All(&m)

	output, err := json.Marshal(m)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(err.Error()))
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Content-Length", strconv.Itoa(len(output)))
	w.WriteHeader(http.StatusOK)
	w.Write(output)
}