package main

import (
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

type Recommendation struct {
	ID     string   `bson:"_id" json:"id"`
	UserId int      `bson:"userId" json:"userId"`
	Labels []string `bson:"labels" json:"labels"`
}

type Recommendations []Recommendation

func (r *Recommendation) Get(db *mgo.Session) error {
	defer db.Close()
	return db.DB(DATABASE).C(COL).Find(bson.M{"_id": bson.ObjectId(r.ID)}).One(r)
}

func (r *Recommendation) GetByUser(db *mgo.Session) (Recommendations, error) {
	data := make(Recommendations, 0)
	defer db.Close()
	err := db.DB(DATABASE).C(COL).FindId(bson.M{"userId": r.UserId}).All(&data)
	return data, err
}

func (r *Recommendation) Create(db *mgo.Session) error {
	defer db.Close()
	return db.DB(DATABASE).C(COL).Insert(r)
}
