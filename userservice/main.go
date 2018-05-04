package main

import (
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

	a := App{}
	a.Initialize(db)
	a.Run(":5000")
}
