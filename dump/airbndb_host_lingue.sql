-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: localhost    Database: airbndb
-- ------------------------------------------------------
-- Server version	8.0.29

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `host_lingue`
--

DROP TABLE IF EXISTS `host_lingue`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `host_lingue` (
  `CodiceHost` varchar(255) NOT NULL,
  `Lingua` varchar(50) NOT NULL,
  PRIMARY KEY (`CodiceHost`,`Lingua`),
  KEY `FK_Host_Lingue_Lingue_idx` (`Lingua`),
  CONSTRAINT `FK_Host_Lingue_Host` FOREIGN KEY (`CodiceHost`) REFERENCES `host` (`CodiceCliente`),
  CONSTRAINT `FK_Host_Lingue_Lingue` FOREIGN KEY (`Lingua`) REFERENCES `lingue` (`Nome`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `host_lingue`
--

LOCK TABLES `host_lingue` WRITE;
/*!40000 ALTER TABLE `host_lingue` DISABLE KEYS */;
INSERT INTO `host_lingue` VALUES ('565b09f5-d735-4c0a-a213-642573f904f0','Francese'),('e12d094d-cb32-473c-b587-7481db645eac','Giapponese'),('d58ef7b5-cb38-44b3-a086-900ffef86d87','Greco'),('565b09f5-d735-4c0a-a213-642573f904f0','Inglese'),('d58ef7b5-cb38-44b3-a086-900ffef86d87','Inglese'),('d9929581-25b1-473d-8349-e4977153600f','Inglese'),('e12d094d-cb32-473c-b587-7481db645eac','Inglese'),('565b09f5-d735-4c0a-a213-642573f904f0','Italiano'),('d3aad9d8-aa84-4814-a11d-bf6c6f429a64','Italiano'),('d58ef7b5-cb38-44b3-a086-900ffef86d87','Italiano'),('d9929581-25b1-473d-8349-e4977153600f','Italiano'),('e12d094d-cb32-473c-b587-7481db645eac','Italiano'),('d3aad9d8-aa84-4814-a11d-bf6c6f429a64','Spagnolo'),('d58ef7b5-cb38-44b3-a086-900ffef86d87','Spagnolo'),('d9929581-25b1-473d-8349-e4977153600f','Tedesco'),('e12d094d-cb32-473c-b587-7481db645eac','Tedesco');
/*!40000 ALTER TABLE `host_lingue` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-07-19 10:42:25
