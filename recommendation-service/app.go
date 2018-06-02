package main

import (
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
	COL = "news"
	DATABASE = "recommendationnews"
)

type App struct {
	db *mgo.Session
	router *mux.Router
}

func (a *App) Initialize(db *mgo.Session) {
	a.db = db
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