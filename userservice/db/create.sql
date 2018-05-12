DROP DATABASE IF EXISTS `usersvc`;
CREATE DATABASE `usersvc`;

USE  `usersvc`;

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(10) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;


LOCK TABLES `users` WRITE;

INSERT INTO `users` VALUES (1,'John Doe','john.doe@gmail.com','123456');

UNLOCK TABLES;