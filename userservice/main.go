package main

import (
	"database/sql"
	"flag"
	"log"
	"os"
)

func main() {
	//initialize mysqldb
	connectionString := os.Getenv("USERSVC_DB_HOST")
	db, err := sql.Open("mysql", connectionString)
	if err != nil {
		log.Fatal("Db initialization failed", err)
	}

	//initialize redis
	redisAddr := os.Getenv("USERSVC_RD_ADDR")
	cache := Cache{ Address: redisAddr}
	cache.Client = cache.NewClient()

	flag.BoolVar(
		&cache.Enabled,
		"cache_enabled",
		false,
		"Enable cache",
	)
	flag.Parse()

	a := App{}
	a.Initialize(db, cache)
	a.Run(":3000")
}
