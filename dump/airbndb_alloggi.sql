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
-- Table structure for table `alloggi`
--

DROP TABLE IF EXISTS `alloggi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alloggi` (
  `Codice` int NOT NULL AUTO_INCREMENT,
  `Tipologia` varchar(100) NOT NULL,
  `NumeroOspitabili` tinyint NOT NULL,
  `NumeroBagni` tinyint NOT NULL,
  `NumeroCamereLetto` tinyint NOT NULL,
  `NumeroLetti` tinyint NOT NULL,
  PRIMARY KEY (`Codice`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alloggi`
--

LOCK TABLES `alloggi` WRITE;
/*!40000 ALTER TABLE `alloggi` DISABLE KEYS */;
INSERT INTO `alloggi` VALUES (1,'Casa',4,2,3,4),(2,'Stanza privata',2,1,1,2),(3,'Stanza condivisa',3,1,1,3),(4,'Casa',6,2,3,7),(5,'Casa',5,2,4,6),(6,'Casa',10,4,5,11),(7,'Casa',4,2,3,5),(8,'Stanza privata',1,1,1,1),(9,'Stanza condivisa',3,1,1,3),(10,'Stanza condivisa',2,1,1,3),(11,'Stanza privata',1,0,1,1),(12,'Stanza privata',2,2,1,4),(13,'Casa',6,2,3,6),(14,'Stanza privata',6,2,2,3),(15,'Stanza privata',3,1,1,4),(16,'Casa',7,2,4,2),(17,'Stanza condivisa',5,1,1,6),(18,'Stanza condivisa',5,1,1,6),(19,'Casa',6,4,2,4),(20,'Casa',6,3,4,2);
/*!40000 ALTER TABLE `alloggi` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-07-18 23:31:45
