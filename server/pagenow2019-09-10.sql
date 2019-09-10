-- MySQL dump 10.13  Distrib 5.7.22, for macos10.13 (x86_64)
--
-- Host: 127.0.0.1    Database: pagenow
-- ------------------------------------------------------
-- Server version	5.7.22

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `pn_compinfo`
--

DROP TABLE IF EXISTS `pn_compinfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pn_compinfo` (
  `id` varchar(64) NOT NULL,
  `type_id` varchar(64) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `aliasName` varchar(255) DEFAULT NULL,
  `remark` text,
  `create_date` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pn_compinfo`
--

LOCK TABLES `pn_compinfo` WRITE;
/*!40000 ALTER TABLE `pn_compinfo` DISABLE KEYS */;
INSERT INTO `pn_compinfo` VALUES ('15c7192d11cc43be80379dd6f1556f97','fe493d19ec50413ab92179a13bde6935','ImageComp','图片','','2019-09-04 10:16:47'),('27f9d28668864a2084342076fbfdbb55','fe493d19ec50413ab92179a13bde6935','TextComp','文本','','2019-09-04 10:17:04'),('4ab9b16dcc944b41b6cd462c27a6e645','fe493d19ec50413ab92179a13bde6935','AComp','超链接','','2019-09-04 10:16:56'),('5b2bbbcdc8d2475fb6e5f518e246414c','fe493d19ec50413ab92179a13bde6935','PnIconComp','图标','','2019-09-10 17:09:42'),('791a2f79d6364fc7a21604f7bd2c7f9e','fe493d19ec50413ab92179a13bde6935','TestChinaMapChart','地图','','2019-09-04 10:16:35'),('79b89bb6fedf4640bb13a30d9356f4a0','fe493d19ec50413ab92179a13bde6935','ITableComp','表格','','2019-09-05 09:32:02'),('f1723d13f55e4666ba24e6ca60d1d299','fe493d19ec50413ab92179a13bde6935','TestBarChart2','柱状图2','','2019-09-04 10:16:26'),('f172d4f11b6745b589a7190e668005d6','fe493d19ec50413ab92179a13bde6935','TestBarChart','柱状图1','','2019-09-04 10:16:16'),('f6a05b11c5ab4ab49af8c855eb06a225','fe493d19ec50413ab92179a13bde6935','Hello','Hello','测试','2019-09-04 10:23:32');
/*!40000 ALTER TABLE `pn_compinfo` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-09-10 17:54:55
