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
-- Table structure for table `immagini`
--

DROP TABLE IF EXISTS `immagini`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `immagini` (
  `Codice` int NOT NULL AUTO_INCREMENT,
  `Percorso` text NOT NULL,
  `CodiceAnnuncio` int NOT NULL,
  PRIMARY KEY (`Codice`),
  KEY `FK_Immagine_Annuncio_idx` (`CodiceAnnuncio`),
  CONSTRAINT `FK_Immagine_Annuncio` FOREIGN KEY (`CodiceAnnuncio`) REFERENCES `annunci` (`CodiceAlloggio`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `immagini`
--

LOCK TABLES `immagini` WRITE;
/*!40000 ALTER TABLE `immagini` DISABLE KEYS */;
INSERT INTO `immagini` VALUES (3,'qldhim3guz4nhevbfh4t',13),(6,'qtpcdyzjwrn9wzyalv0g',14),(7,'qldhim3guz4nhevbfh4t',16),(8,'qldhim3guz4nhevbfh4t',17),(9,'qldhim3guz4nhevbfh4t',18),(10,'qldhim3guz4nhevbfh4t',1),(11,'js9sj8pm7abojh3chen9',2),(12,'ntjuupcpjr2wvksz31bf',3),(13,'qldhim3guz4nhevbfh4t',4),(14,'m55hakkex1snwcijopod',5),(15,'qldhim3guz4nhevbfh4t',6),(16,'bvq2ohfjdk2lgvbwbqag',7),(17,'llzg9bkegv3oipa7qjdd',8),(18,'qldhim3guz4nhevbfh4t',9),(19,'qldhim3guz4nhevbfh4t',10),(20,'qldhim3guz4nhevbfh4t',11),(21,'qldhim3guz4nhevbfh4t',12),(22,'qldhim3guz4nhevbfh4t',15),(23,'qldhim3guz4nhevbfh4t',19),(24,'ievzauvnxv8ifrpmhtge',20),(25,'mgd7befukrus8hrqgqt4',20);
/*!40000 ALTER TABLE `immagini` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-07-18 23:31:46
