
DROP DATABASE IF EXISTS `famousnews`;
CREATE DATABASE `famousnews`;

USE `famousnews`;

DROP TABLE IF EXISTS `news`;
CREATE TABLE `news` (
  `id` varchar(36) NOT NULL,
  `title` varchar(200) NOT NULL,
  `content` text NOT NULL,
  `author` varchar(200) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `published_at` datetime DEFAULT NULL,
  `news_type` varchar(45) DEFAULT NULL,
  `tags` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `title_UNIQUE` (`title`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;