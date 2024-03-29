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
-- Table structure for table `annunci_regole`
--

DROP TABLE IF EXISTS `annunci_regole`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `annunci_regole` (
  `CodiceAnnuncio` int NOT NULL,
  `CodiceRegola` int NOT NULL,
  PRIMARY KEY (`CodiceAnnuncio`,`CodiceRegola`),
  KEY `FK_Codice_Regola_idx` (`CodiceRegola`),
  CONSTRAINT `FK_Annuncio_Regola_Annuncio` FOREIGN KEY (`CodiceAnnuncio`) REFERENCES `annunci` (`CodiceAlloggio`),
  CONSTRAINT `FK_Codice_Regola` FOREIGN KEY (`CodiceRegola`) REFERENCES `regole` (`Codice`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `annunci_regole`
--

LOCK TABLES `annunci_regole` WRITE;
/*!40000 ALTER TABLE `annunci_regole` DISABLE KEYS */;
INSERT INTO `annunci_regole` VALUES (1,1),(2,1),(3,1),(4,1),(5,1),(6,1),(7,1),(8,1),(9,1),(10,1),(11,1),(12,1),(13,1),(14,1),(19,1),(20,1),(1,2),(2,2),(3,2),(4,2),(5,2),(6,2),(7,2),(8,2),(9,2),(10,2),(11,2),(12,2),(13,2),(14,2),(19,2),(20,2),(1,3),(2,3),(3,3),(4,3),(5,3),(6,3),(7,3),(8,3),(9,3),(10,3),(11,3),(13,3),(14,3),(19,3),(20,3),(1,4),(2,4),(3,4),(4,4),(5,4),(6,4),(7,4),(8,4),(9,4),(10,4),(12,4),(13,4),(14,4),(20,4),(1,5),(2,5),(3,5),(4,5),(7,5),(10,5),(14,5),(19,5),(20,5),(1,6),(2,6),(6,6),(9,6),(12,6),(14,6),(19,6),(20,6),(1,7),(5,7),(6,7),(7,7),(9,7),(10,7),(13,7),(14,7),(1,8),(8,8),(11,8),(12,8),(13,8),(20,8),(1,9),(3,9),(4,9),(5,9),(6,9),(9,9),(19,9),(4,10),(5,10),(7,10),(8,10),(11,10),(12,10),(19,10);
/*!40000 ALTER TABLE `annunci_regole` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-07-19 10:42:27
