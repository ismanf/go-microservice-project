package main

import (
	"encoding/gob"
	"bytes"
	"github.com/streadway/amqp"
	"reflect"
	"strconv"
	"encoding/json"
	"net/http"
	"log"
	"github.com/gorilla/mux"
	"github.com/codegangsta/negroni"
	"gopkg.in/mgo.v2"
)

const (
	COL = "recommended_news"
	DATABASE = "recommendations"
	QUEUE_CREATE = "recommendations.create"
)

type App struct {
	db *mgo.Session
	mb *amqp.Channel
	router *mux.Router
}

func (a *App) Initialize(db *mgo.Session, mb *amqp.Channel) {
	a.db = db
	a.mb = mb
}

func (a *App) Run(addr string) {
	n := negroni.Classic()
	n.UseHandler(a.router)
	log.Println("Recommendation microservice listening on port", addr)
	log.Fatal(http.ListenAndServe(addr, n))
}

func (a *App) DB() *mgo.Session {
	return a.db.Clone()
}

func (a *App) initializeRoutes() {
	a.router = mux.NewRouter()
	
	a.router.
		HandleFunc("/recommendations/{id}", a.getUserRecommendations).
		Methods("GET")

	a.router.
		HandleFunc("/recommendations/byuser/{user_id:[0-9]}/", a.getUserRecommendations).
		Methods("GET")
}

func (a *App) listenQeueue() {
	msgs, err := a.mb.Consume(
		QUEUE_CREATE,
		"",
		true,
		false,
		false,
		false,
		nil,
	)
	checkError(err)

	go func() {
		for d := range msgs {
			a.saveRecommendation(d.Body)
		}
	}()
}

// Api actions
func (a *App) getRecommendation(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]
	recm := &Recommendation{ID: id}

	if err := recm.Get(a.DB()); err != nil {
		switch err {
		case mgo.ErrNotFound:
			respondWithJSON(w, http.StatusNotFound, "Recommendation not found")
		default: 
			respondWithError(w, http.StatusInternalServerError, err.Error())
		}
		return
	 }
	 
	 respondWithJSON(w, http.StatusOK, recm)
}

func (a *App) getUserRecommendations(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := strconv.Atoi(vars["user_id"])
	
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, err.Error())
		return		
	}

	recm := &Recommendation{UserId: id}
	data, err := recm.GetByUser(a.DB())
	if err != nil {
		switch err {
		case mgo.ErrNotFound:
			respondWithJSON(w, http.StatusNotFound, "Recommendations for user not found")
		default: 
			respondWithError(w, http.StatusInternalServerError, err.Error())
		}
		return
	 }
	
	 respondWithJSON(w, http.StatusOK, data)
}

// AMQP actions
func (a *App) saveRecommendation(b []byte) {
	var m map[string]interface{}
	buf := bytes.NewBuffer(b)
	decoder := gob.NewDecoder(buf)
	err := decoder.Decode(&m)
	checkError(err)

	var userId int
	var labels []string

	userId, _ = m["userId"].(int)
	labels, _ = m["labels"].([]string)

	r := Recommendation{
		UserId: userId,
		Labels: labels,		
	}

	err = r.Create(a.DB())
	checkError(err)
}

//Helper functions
func respondWithError(w http.ResponseWriter, code int, message string) {
	respondWithJSON(w, code, map[string]string{"error": message})
}

func respondWithJSON(w http.ResponseWriter, code int, payload interface{}){
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(code)

	if(reflect.TypeOf(payload).String() == "string"){
		str, _ := payload.(string)
		w.Write([]byte(str))
		return
	}

	encoder := json.NewEncoder(w)
	encoder.Encode(&payload)
}