package handler

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/ismayilmalik/go-microservice-project/booking/db"
	"github.com/ismayilmalik/go-microservice-project/booking/model"
)

func Check(w http.ResponseWriter, r *http.Request) {
	_, err := db.NewSession()
	if err != nil {
		output, _ := json.Marshal(model.HealthCheck{State: "Database is unaccessable."})
		w.Header().Set("Content-Type", "application/json")
		w.Header().Set("Content-Length", strconv.Itoa(len(output)))
		w.WriteHeader(http.StatusServiceUnavailable)
		w.Write(output)
	}

	output, _ := json.Marshal(model.HealthCheck{State: "UP"})
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Content-Length", strconv.Itoa(len(output)))
	w.WriteHeader(http.StatusOK)
	w.Write(output)
}
