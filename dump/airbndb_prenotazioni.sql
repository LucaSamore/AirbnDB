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
-- Table structure for table `prenotazioni`
--

DROP TABLE IF EXISTS `prenotazioni`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prenotazioni` (
  `Codice` int NOT NULL AUTO_INCREMENT,
  `DataInizioSoggiorno` date NOT NULL,
  `DataFineSoggiorno` date NOT NULL,
  `NumeroAdulti` tinyint NOT NULL,
  `NumeroBambini` tinyint NOT NULL,
  `NumeroNeonati` tinyint NOT NULL,
  `NumeroAnimali` tinyint NOT NULL,
  `CodiceCliente` varchar(255) NOT NULL,
  `CodiceAnnuncio` int NOT NULL,
  PRIMARY KEY (`Codice`),
  KEY `FK_Prenotazione_Cliente_idx` (`CodiceCliente`),
  KEY `FK_Prenotazione_Annuncio_idx` (`CodiceAnnuncio`),
  CONSTRAINT `FK_Prenotazione_Annuncio` FOREIGN KEY (`CodiceAnnuncio`) REFERENCES `annunci` (`CodiceAlloggio`),
  CONSTRAINT `FK_Prenotazione_Cliente` FOREIGN KEY (`CodiceCliente`) REFERENCES `clienti` (`Codice`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prenotazioni`
--

LOCK TABLES `prenotazioni` WRITE;
/*!40000 ALTER TABLE `prenotazioni` DISABLE KEYS */;
INSERT INTO `prenotazioni` VALUES (1,'2022-07-23','2022-07-30',15,7,1,0,'565b09f5-d735-4c0a-a213-642573f904f0',1),(2,'2022-06-18','2022-06-25',2,1,0,0,'565b09f5-d735-4c0a-a213-642573f904f0',2),(3,'2021-09-14','2021-09-16',2,3,0,1,'565b09f5-d735-4c0a-a213-642573f904f0',6),(4,'2019-04-14','2019-04-24',1,0,0,0,'d3aad9d8-aa84-4814-a11d-bf6c6f429a64',12),(5,'2022-01-15','2022-01-20',1,0,0,1,'9fa74bf0-92a1-45f3-94bf-e8420576838d',10),(6,'2022-02-19','2022-02-25',2,1,0,0,'7a9b60a6-c805-4779-8b69-55a7964413c5',5),(7,'2021-11-12','2021-11-17',1,0,0,0,'565b09f5-d735-4c0a-a213-642573f904f0',3),(8,'2022-03-04','2022-03-10',2,0,0,0,'e12d094d-cb32-473c-b587-7481db645eac',7),(9,'2022-06-12','2022-06-14',1,1,1,0,'97e6781b-6fdf-48d8-bddb-c16f43397548',4),(10,'2021-07-25','2021-07-26',1,1,0,0,'565b09f5-d735-4c0a-a213-642573f904f0',6),(11,'2022-08-01','2022-08-08',5,2,1,2,'565b09f5-d735-4c0a-a213-642573f904f0',6),(12,'2022-08-01','2022-08-29',3,1,1,1,'565b09f5-d735-4c0a-a213-642573f904f0',6),(13,'2022-08-01','2022-08-08',3,1,1,1,'565b09f5-d735-4c0a-a213-642573f904f0',1),(17,'2022-08-02','2022-08-05',3,1,1,1,'565b09f5-d735-4c0a-a213-642573f904f0',1);
/*!40000 ALTER TABLE `prenotazioni` ENABLE KEYS */;
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
