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
-- Table structure for table `host`
--

DROP TABLE IF EXISTS `host`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `host` (
  `CodiceCliente` varchar(255) NOT NULL,
  `Biografia` text,
  `CoordinateBancarie` varchar(255) NOT NULL,
  `CodiceDocumento` varchar(100) NOT NULL,
  `TipologiaDocumento` varchar(100) NOT NULL,
  `DataScadenzaDocumento` date NOT NULL,
  PRIMARY KEY (`CodiceCliente`),
  CONSTRAINT `FK_Codice_Cliente_Host` FOREIGN KEY (`CodiceCliente`) REFERENCES `clienti` (`Codice`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `host`
--

LOCK TABLES `host` WRITE;
/*!40000 ALTER TABLE `host` DISABLE KEYS */;
INSERT INTO `host` VALUES ('14daa0bc-d8f3-40c9-814b-fff50ba0beb2','Test trasformazione host','IT75Y0300203280544285289693','CA23409LO','Carta d\'identità','2026-05-12'),('565b09f5-d735-4c0a-a213-642573f904f0','Ciao! Sono Mario e sono la stessa persona che Luca utilizza per i suoi test da 5 anni!','IT29S0300203280662754833298','CA12376CV','Carta di identità','2025-07-25'),('9fa74bf0-92a1-45f3-94bf-e8420576838d','Ciao sono un test','IT50O0300203280676543566544','ER12345ZX','Carta d\'identità','2025-05-13'),('d3aad9d8-aa84-4814-a11d-bf6c6f429a64','Non so cosa scrivere!','IT56J0300203280768124458443','CE34476SI','Carta di identità','2025-04-04'),('d58ef7b5-cb38-44b3-a086-900ffef86d87','Sono il secondo host e di AirbnDB!','IT23A0300203280583639224764','AS21189LV','Carta di identità','2024-05-09'),('d9929581-25b1-473d-8349-e4977153600f','Sono un host eccezionale','IT67J0300203280892539642838','CA21189RF','Carta di identità','2026-09-12'),('e12d094d-cb32-473c-b587-7481db645eac','Fare l\'host è il mio lavoro preferito','IT47U0300203280832796561976','DO56671CL','Carta di identità','2023-02-21');
/*!40000 ALTER TABLE `host` ENABLE KEYS */;
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
