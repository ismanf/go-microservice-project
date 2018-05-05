package main

import (
	"flag"
	"database/sql"
	"fmt"
	"log"
)

func main() {
	name := "mobesetCore"
	host := "127.0.0.1"
	port := 3306
	user := "root"
	password := "123456"
	driver := "mysql"

	connectionString := fmt.Sprintf(
		"%s:%s@tcp(%s:%d)/%s?parseTime=true&multiStatements=true",
		user,
		password,
		host,
		port,
		name)
	

	db, err := sql.Open(driver, connectionString)
	if err != nil {
		log.Fatal("Db initialization failed", err)
	}

	cache := Cache{}
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
	a.Run(":5000")
}