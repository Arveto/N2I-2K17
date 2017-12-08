SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

CREATE TABLE `arvauto_events` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'event''s id',
  `type_id` bigint(20) NOT NULL COMMENT 'type''s id',
  `description` text NOT NULL COMMENT 'event''s descriptin',
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'event''s publish date',
  `latitude` float(5,3) NOT NULL COMMENT 'event''s latitude',
  `longitude` float(5,3) NOT NULL COMMENT 'event''s longitude',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE `arvauto_events_types` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'type''s id',
  `name` varchar(255) NOT NULL COMMENT 'type''s name',
  `description` text NOT NULL COMMENT 'type''s description',
  PRIMARY KEY (`id`),
  UNIQUE (`name`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE `arvauto_messages` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'message''s id',
  `event_id` bigint(20) NOT NULL COMMENT 'event''s id',
  `user_id` bigint(20) NOT NULL COMMENT 'user''s id',
  `content` text NOT NULL COMMENT 'message''s content',
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'message''s delevery date',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE `arvauto_skills` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'skill''s id',
  `name` varchar(255) NOT NULL COMMENT 'skill name',
  `description` text NOT NULL COMMENT 'skill''s description',
  PRIMARY KEY (`id`),
  UNIQUE (`name`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE `arvauto_users` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'user''s id',
  `email` varchar(255) NOT NULL COMMENT 'users''s email',
  `pass` varchar(255) NOT NULL COMMENT 'user''s encrypted password',
  `familyname` varchar(255) DEFAULT NULL COMMENT 'user''s familyname',
  `firstname` varchar(255) DEFAULT NULL COMMENT 'user''s firstname',
  `last_log` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'user''s last connection',
  `chat_event` bigint(20) NOT NULL DEFAULT '0' COMMENT 'user''s curent chat room',
  `connected` tinyint(4) NOT NULL DEFAULT '0' COMMENT 'is the user online',
  PRIMARY KEY (`id`),
  UNIQUE (`email`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE `arvauto_users_skills` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `user_id` bigint(20) NOT NULL COMMENT 'user''s id',
  `skill_id` bigint(20) NOT NULL COMMENT 'skill''s id',
  `level` tinyint(4) NOT NULL COMMENT 'skill level (percents)',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
