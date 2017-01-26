# ************************************************************
# Sequel Pro SQL dump
# Version 4096
#
# http://www.sequelpro.com/
# http://code.google.com/p/sequel-pro/
#
# Host: 10.10.153.132 (MySQL 5.6.20-ucloudrel1-log)
# Database: valentino_valentine
# Generation Time: 2017-01-26 10:24:45 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table band
# ------------------------------------------------------------

DROP TABLE IF EXISTS `band`;

CREATE TABLE `band` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `uid` int(11) NOT NULL,
  `fuid` int(11) NOT NULL,
  `createtime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `band` (`uid`,`fuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `band` WRITE;
/*!40000 ALTER TABLE `band` DISABLE KEYS */;

INSERT INTO `band` (`id`, `uid`, `fuid`, `createtime`)
VALUES
	(1,1,2,'2017-01-25 14:58:32'),
	(3,2,1,'2017-01-25 14:58:39'),
	(4,10,2,'2017-01-26 10:14:48'),
	(5,2,10,'2017-01-26 10:14:48');

/*!40000 ALTER TABLE `band` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table info
# ------------------------------------------------------------

DROP TABLE IF EXISTS `info`;

CREATE TABLE `info` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `uid` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `cellphone` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT '',
  `status` int(11) DEFAULT '0',
  `created` datetime DEFAULT NULL,
  `updated` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `uid` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table product
# ------------------------------------------------------------

DROP TABLE IF EXISTS `product`;

CREATE TABLE `product` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `uid` int(11) NOT NULL,
  `nickname` blob NOT NULL,
  `background` int(11) NOT NULL,
  `color` int(11) NOT NULL,
  `content` varchar(20) NOT NULL DEFAULT '',
  `createtime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;

INSERT INTO `product` (`id`, `uid`, `nickname`, `background`, `color`, `content`, `createtime`)
VALUES
	(1,1,X'44656D6F6EF09F9884',1,2,'AB','2017-01-25 15:17:32'),
	(2,2,X'56696E63656E',2,2,'AA','2017-01-25 15:18:01');

/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table user
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `uid` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `openid` varchar(255) DEFAULT NULL,
  `nickname` blob,
  `headimgurl` varchar(255) DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `updated` datetime DEFAULT NULL,
  PRIMARY KEY (`uid`),
  KEY `openid` (`openid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;

INSERT INTO `user` (`uid`, `openid`, `nickname`, `headimgurl`, `created`, `updated`)
VALUES
	(1,'oubzBuGFCOr42EkkKeQIav6tcipk',X'44656D6F6EF09F9884','http://wx.qlogo.cn/mmopen/ajNVdqHZLLBTRDNIP30QtYFovLQVxjcvQgAjKo4IpUeMZBWrfiacPe1D5ufYfibTMLNicyALWd9cEl57dVCXRNu6A/0','2017-01-25 14:24:55','2017-01-25 14:24:55'),
	(2,'123',X'56696E63656E','http://wx.qlogo.cn/mmopen/ajNVdqHZLLBTRDNIP30QtYFovLQVxjcvQgAjKo4IpUeMZBWrfiacPe1D5ufYfibTMLNicyALWd9cEl57dVCXRNu6A/0','2017-01-25 14:24:55','2017-01-25 14:24:55');

/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
