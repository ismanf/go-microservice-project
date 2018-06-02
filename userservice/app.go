package main

import (
	"fmt"
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
	"strconv"

	"github.com/codegangsta/negroni"
	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/mux"
)

type App struct {
	Cache Cache
	DB     *sql.DB
	Router *mux.Router
}

func (a *App) Initialize(db *sql.DB, cache Cache) {
	a.DB = db
	a.Cache = cache
	a.initializeRoutes()
}

func (a *App) Run(addr string) {
	n := negroni.Classic()
	n.UseHandler(a.Router)
	log.Println("Microservice listening on port ", addr)
	log.Fatal(http.ListenAndServe(addr, n))
}

func (a *App) initializeRoutes() {
	a.Router = mux.NewRouter()
	a.Router.HandleFunc("/users/{id:[0-9]}", a.getUser).Methods("GET")
}

func respondWithError(w http.ResponseWriter, code int, message string) {
	respondWithJSON(w, code, map[string]string{"error": message})
}

func respondWithJSON(w http.ResponseWriter, code int, payload interface{}) {
	var response []byte
	switch payload.(type) {
	case string: {
		str, _ := payload.(string)
		response = []byte(str)
	}
	default:
		response, _ = json.Marshal(payload)
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(code)
	w.Write(response)
}

func (a *App) getUser(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := strconv.Atoi(vars["id"])
	if err != nil {
		respondWithError(w, http.StatusBadRequest, "Invalid user ID")
		return
	}

	key := fmt.Sprintf("%s|%d",r.URL.Path,id)
	if val, err := a.Cache.getValue(key); err == nil && len(val) != 0 {
		respondWithJSON(w, http.StatusOK, val)
		return
	} 

	user := User{ID: id}
	if err := user.get(a.DB); err != nil {
		switch err {
		case sql.ErrNoRows:
			respondWithError(w, http.StatusNotFound, "User not found")
		default:
			respondWithError(w, http.StatusInternalServerError, err.Error())
		}
		return
	}

	if err:= a.Cache.setValue(key, user); err != nil {
		respondWithError(w, http.StatusInternalServerError, err.Error())
		return
	}

	respondWithJSON(w, http.StatusOK, user)
}
