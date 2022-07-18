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
-- Table structure for table `luoghi`
--

DROP TABLE IF EXISTS `luoghi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `luoghi` (
  `CodiceAlloggio` int NOT NULL,
  `Via` varchar(100) NOT NULL,
  `Civico` int NOT NULL,
  `CAP` varchar(16) NOT NULL,
  `Citta` varchar(50) NOT NULL,
  `Stato` varchar(50) NOT NULL,
  PRIMARY KEY (`CodiceAlloggio`),
  KEY `FK_Luogo_Citta_idx` (`Citta`),
  KEY `FK_Luogo_Stato_idx` (`Stato`),
  CONSTRAINT `FK_Alloggio_Luogo` FOREIGN KEY (`CodiceAlloggio`) REFERENCES `alloggi` (`Codice`),
  CONSTRAINT `FK_Luogo_Citta` FOREIGN KEY (`Citta`) REFERENCES `citta` (`Nome`),
  CONSTRAINT `FK_Luogo_Stato` FOREIGN KEY (`Stato`) REFERENCES `stati` (`Nome`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `luoghi`
--

LOCK TABLES `luoghi` WRITE;
/*!40000 ALTER TABLE `luoghi` DISABLE KEYS */;
INSERT INTO `luoghi` VALUES (1,'Via Tal dei Tali',4330,'47521','Cesena','Italia'),(2,'Via Tal dei Quali',1022,'20019','Milano','Italia'),(3,'Via Qual dei Tali',21,'20089','Milano','Italia'),(4,'Via Tali dei Quali ',33,'00123','Roma','Italia'),(5,'Via Tale del Quale',555,'75000','Parigi','Francia'),(6,'Via Quale del Tale',2222,'GY9','Londra','Inghilterra'),(7,'Via Qual del Tale',7811,'IM9','Londra','Inghilterra'),(8,'Via Quale dei Quali',3434,'08001','Barcellona','Spagna'),(9,'Via Quali dei Quali',9900,'08012','Barcellona','Spagna'),(10,'Via Papal dei Papali',5621,'22769','Berlino','Germania'),(11,'Via Papali Papali',3322,'14199','Berlino','Germania'),(12,'Via dei Ciarlatani',17,'10431','Atene','Grecia'),(14,'Via dei test',2,'47521','Cesena','Italia'),(15,'Via dei test',17,'12345','Barcellona','Spagna'),(16,'via dei test',8,'12345','Roma','Italia'),(17,'via dei test',11,'32145','Berlino','Germania'),(18,'via dei test',11,'32145','Berlino','Germania'),(19,'Via dei grandi test',60,'34567','Zurigo','Svizzera'),(20,'via di non lo so',6,'32145','Parigi','Francia');
/*!40000 ALTER TABLE `luoghi` ENABLE KEYS */;
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
