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
-- Table structure for table `recensioni`
--

DROP TABLE IF EXISTS `recensioni`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recensioni` (
  `CodicePrenotazione` int NOT NULL,
  `Descrizione` text NOT NULL,
  `VotoPrecisione` int NOT NULL,
  `VotoComunicazione` int NOT NULL,
  `VotoPosizione` int NOT NULL,
  `VotoQualitaPrezzo` int NOT NULL,
  `VotoCheckIn` int NOT NULL,
  `VotoPulizia` int NOT NULL,
  `CodiceAnnuncio` int NOT NULL,
  PRIMARY KEY (`CodicePrenotazione`),
  KEY `FK_Recensione_Annuncio_idx` (`CodiceAnnuncio`),
  CONSTRAINT `FK_Recensione_Annuncio` FOREIGN KEY (`CodiceAnnuncio`) REFERENCES `annunci` (`CodiceAlloggio`),
  CONSTRAINT `FK_Recensione_Prenotazione` FOREIGN KEY (`CodicePrenotazione`) REFERENCES `prenotazioni` (`Codice`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recensioni`
--

LOCK TABLES `recensioni` WRITE;
/*!40000 ALTER TABLE `recensioni` DISABLE KEYS */;
INSERT INTO `recensioni` VALUES (1,'OOO Belloooo',5,4,3,2,1,5,1),(2,'Pulizia non delle migliori ma ok...',3,3,4,4,3,1,2),(3,'Servizio ottimo e host gentilissimo. Consigliato!',5,5,4,4,3,5,6),(7,'Test inserimento recensione dajeeee',5,4,3,2,1,5,3),(8,'Non male!',5,3,4,3,3,3,7),(9,'Posizione un po\' scomoda',2,3,1,5,4,3,4),(10,'Prezzo leggermente alto',4,3,2,2,5,2,6);
/*!40000 ALTER TABLE `recensioni` ENABLE KEYS */;
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
