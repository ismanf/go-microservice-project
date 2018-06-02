package main

import (
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

type QueueMessage map[string]interface{}

type Recommendation struct {
	ID     bson.ObjectId `bson:"_id" json:"id"`
	UserId int           `bson:"userId" json:"userId"`
	Labels []string      `bson:"labels" json:"labels"`
}

type Recommendations []Recommendation

func (r *Recommendation) Get(db *mgo.Session) error {
	defer db.Close()
	return db.DB(DATABASE).C(COL).Find(bson.M{"_id": r.ID}).One(r)
}

func (r *Recommendation) GetByUser(db *mgo.Session) (Recommendations, error) {
	var data Recommendations
	defer db.Close()
	err := db.DB(DATABASE).C(COL).Find(bson.M{"userId": r.UserId}).All(&data)
	return data, err
}

func (r *Recommendation) Create(db *mgo.Session) error {
	r.ID = bson.NewObjectId()
	defer db.Close()
	return db.DB(DATABASE).C(COL).Insert(r)
}
