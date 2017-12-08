CREATE TABLE `arvauto_events` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'event''s id',
  `type_id` bigint(20) NOT NULL COMMENT 'type''s id',
  `description` text NOT NULL COMMENT 'event''s descriptin',
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'event''s publish date',
  `latitude` float(5,3) NOT NULL COMMENT 'event''s latitude',
  `longitude` float(5,3) NOT NULL COMMENT 'event''s longitude',
  `n_users` smallint(6) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

CREATE TABLE `arvauto_events_types` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'type''s id',
  `name` varchar(255) NOT NULL COMMENT 'type''s name',
  `description` text NOT NULL COMMENT 'type''s description',
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

CREATE TABLE `arvauto_messages` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'message''s id',
  `event_id` bigint(20) NOT NULL COMMENT 'event''s id',
  `user_id` bigint(20) NOT NULL COMMENT 'user''s id',
  `content` text NOT NULL COMMENT 'message''s content',
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'message''s delevery date',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE `arvauto_users` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'user''s id',
  `email` varchar(255) NOT NULL COMMENT 'users''s email',
  `pass` varchar(255) NOT NULL COMMENT 'user''s encrypted password',
  `familyname` varchar(255) DEFAULT NULL COMMENT 'user''s familyname',
  `firstname` varchar(255) DEFAULT NULL COMMENT 'user''s firstname',
  `last_log` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'user''s last connection',
  `event_id` bigint(20) DEFAULT '0' COMMENT 'user''s curent chat room',
  `connected` tinyint(4) DEFAULT '0' COMMENT 'is the user online',
  `socket_id` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
