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
-- Table structure for table `messaggi`
--

DROP TABLE IF EXISTS `messaggi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messaggi` (
  `Codice` int NOT NULL AUTO_INCREMENT,
  `Contenuto` text NOT NULL,
  `DataOra` datetime NOT NULL,
  `Cliente` varchar(255) NOT NULL,
  `Host` varchar(255) NOT NULL,
  PRIMARY KEY (`Codice`),
  KEY `FK_Messaggio_Cliente_idx` (`Cliente`),
  KEY `FK_Messaggio_Host_idx` (`Host`),
  CONSTRAINT `FK_Messaggio_Cliente` FOREIGN KEY (`Cliente`) REFERENCES `clienti` (`Codice`),
  CONSTRAINT `FK_Messaggio_Host` FOREIGN KEY (`Host`) REFERENCES `host` (`CodiceCliente`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messaggi`
--

LOCK TABLES `messaggi` WRITE;
/*!40000 ALTER TABLE `messaggi` DISABLE KEYS */;
INSERT INTO `messaggi` VALUES (1,'Ciao! Ho bisogno di chiedere un\'informazione','2022-07-13 12:12:10','565b09f5-d735-4c0a-a213-642573f904f0','d58ef7b5-cb38-44b3-a086-900ffef86d87'),(2,'Ciao! Mi dica','2022-07-13 12:37:24','565b09f5-d735-4c0a-a213-642573f904f0','d58ef7b5-cb38-44b3-a086-900ffef86d87'),(3,'Non mi ricordo cosa dovevo chiedere','2022-07-13 17:09:02','565b09f5-d735-4c0a-a213-642573f904f0','d58ef7b5-cb38-44b3-a086-900ffef86d87'),(4,'Salve, per caso è possibile effettuare il check-in per le 16?','2022-06-22 09:45:43','14daa0bc-d8f3-40c9-814b-fff50ba0beb2','d9929581-25b1-473d-8349-e4977153600f'),(5,'Ciao! Sì, senza problemi','2022-06-22 10:03:12','14daa0bc-d8f3-40c9-814b-fff50ba0beb2','d9929581-25b1-473d-8349-e4977153600f'),(6,'Perfetto, grazie mille','2022-06-22 10:07:22','14daa0bc-d8f3-40c9-814b-fff50ba0beb2','d9929581-25b1-473d-8349-e4977153600f'),(7,'Ciao! Questo è un messaggio di prova','2022-07-15 08:16:29','565b09f5-d735-4c0a-a213-642573f904f0','d9929581-25b1-473d-8349-e4977153600f'),(8,'Secondo messaggio di prova','2022-07-15 08:18:25','565b09f5-d735-4c0a-a213-642573f904f0','d9929581-25b1-473d-8349-e4977153600f'),(9,'Ancora un altro test','2022-07-15 08:23:54','565b09f5-d735-4c0a-a213-642573f904f0','d9929581-25b1-473d-8349-e4977153600f'),(10,'Heyooo','2022-07-15 08:27:10','565b09f5-d735-4c0a-a213-642573f904f0','d9929581-25b1-473d-8349-e4977153600f'),(11,'UlaUla','2022-07-15 08:39:59','565b09f5-d735-4c0a-a213-642573f904f0','d9929581-25b1-473d-8349-e4977153600f');
/*!40000 ALTER TABLE `messaggi` ENABLE KEYS */;
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
