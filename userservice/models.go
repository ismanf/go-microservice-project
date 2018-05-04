package main

import (
	"database/sql"
)

type User struct {
	ID       int    `json:"id"`
	Name     string `json:"name"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

type Users []User

func (u *User) get(db *sql.DB) error {
	return db.QueryRow("select name, email from usersvc.users where id=? ;", u.ID).Scan(&u.Name, &u.Email)
}

func (u *User) create(db *sql.DB) error {
	stmt, err := db.Prepare("insert into usersvc.users(name,email,password) values(?,?,?) ;")
	defer stmt.Close()
	if err != nil {
		return err
	}
	_, err = stmt.Exec(u.Name, u.Email, u.Password)
	return err
}

func (u *User) update(db *sql.DB) error {
	stmt, err := db.Prepare("update usersvc.users set name=?, email=? where id=?")
	defer stmt.Close()
	if err != nil {
		return err
	}
	_, err = stmt.Exec(u.Name, u.Email, u.ID)
	return err
}
