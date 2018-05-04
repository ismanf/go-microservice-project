-- schema 
CREATE SCHEMA `usersvc` DEFAULT CHARACTER SET utf8 ;

-- users table
CREATE TABLE `usersvc`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `password` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC));
