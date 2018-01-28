package model

import (
	"gopkg.in/mgo.v2/bson"
)

type Booking struct {
	ID       bson.ObjectId `json:"id" bson:"_id"`
	Hotel    string        `json:"hotel" bson:"hotel"`
	Floor    int           `json:"floor" bson:"floor"`
	Room     int           `json:"room" bson:"room"`
	DayCount int           `json:"dayCount" bson:"dayCount"`
}

type Bookings []Booking
