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
-- Table structure for table `transazioni`
--

DROP TABLE IF EXISTS `transazioni`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transazioni` (
  `CodicePrenotazione` int NOT NULL,
  `CodiceHost` varchar(255) NOT NULL,
  `Stato` varchar(50) NOT NULL,
  `PrezzoFinale` decimal(12,2) NOT NULL,
  `MetodoPagamento` varchar(50) NOT NULL,
  `CodiceSconto` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`CodicePrenotazione`,`CodiceHost`),
  KEY `FK_Transazione_Host_idx` (`CodiceHost`),
  KEY `FK_Transazione_Metodo_Pagamento_idx` (`MetodoPagamento`),
  KEY `FK_Transazione_Sconto_idx` (`CodiceSconto`),
  CONSTRAINT `FK_Transazione_Host` FOREIGN KEY (`CodiceHost`) REFERENCES `host` (`CodiceCliente`),
  CONSTRAINT `FK_Transazione_Metodo_Pagamento` FOREIGN KEY (`MetodoPagamento`) REFERENCES `metodi_pagamento` (`Metodo`),
  CONSTRAINT `FK_Transazione_Prenotazione` FOREIGN KEY (`CodicePrenotazione`) REFERENCES `prenotazioni` (`Codice`),
  CONSTRAINT `FK_Transazione_Sconto` FOREIGN KEY (`CodiceSconto`) REFERENCES `sconti` (`Codice`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transazioni`
--

LOCK TABLES `transazioni` WRITE;
/*!40000 ALTER TABLE `transazioni` DISABLE KEYS */;
INSERT INTO `transazioni` VALUES (1,'d9929581-25b1-473d-8349-e4977153600f','Completato',877.00,'Paypal','003c60fe-5647-4e02-8dca-dce291520996'),(2,'d9929581-25b1-473d-8349-e4977153600f','Completato',107.00,'Paypal','1b28122f-aeb4-46b7-bab2-fb0ddf17c7aa'),(3,'d9929581-25b1-473d-8349-e4977153600f','Completato',1092.00,'Carta di credito',NULL),(4,'d9929581-25b1-473d-8349-e4977153600f','Completato',155.00,'Carta di credito',NULL),(5,'e12d094d-cb32-473c-b587-7481db645eac','Completato',7.00,'Paypal','4753b40c-c258-4992-80bc-0bd00f9d565b'),(6,'d9929581-25b1-473d-8349-e4977153600f','Completato',5083.00,'Paypal',NULL),(7,'d9929581-25b1-473d-8349-e4977153600f','Completato',335.00,'Carta di credito',NULL),(8,'d9929581-25b1-473d-8349-e4977153600f','Completato',5960.00,'Paypal','68c17207-d3f2-42b5-b0b9-7fc899e8a66c'),(9,'d3aad9d8-aa84-4814-a11d-bf6c6f429a64','Completato',1424.00,'Paypal',NULL),(10,'d9929581-25b1-473d-8349-e4977153600f','Completato',1092.00,'Carta di credito',NULL),(11,'d9929581-25b1-473d-8349-e4977153600f','In corso',5320.00,'Paypal',NULL),(12,'d9929581-25b1-473d-8349-e4977153600f','In corso',10001.60,'Paypal',NULL),(13,'d9929581-25b1-473d-8349-e4977153600f','In corso',3113.39,'Paypal',NULL),(17,'d9929581-25b1-473d-8349-e4977153600f','In corso',979.62,'Paypal','9728964b-5aac-425c-aab4-e9b28513f4af'),(18,'d9929581-25b1-473d-8349-e4977153600f','In corso',759.32,'Paypal','83570b74-04b1-4a90-9aac-584918c9bc2a');
/*!40000 ALTER TABLE `transazioni` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-07-19 10:42:26
