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
-- Table structure for table `possedimenti`
--

DROP TABLE IF EXISTS `possedimenti`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `possedimenti` (
  `CodiceAlloggio` int NOT NULL,
  `CodiceHost` varchar(255) NOT NULL,
  PRIMARY KEY (`CodiceAlloggio`,`CodiceHost`),
  KEY `FK_Possedimenti_Host_idx` (`CodiceHost`),
  CONSTRAINT `FK_Possedimenti_Alloggio` FOREIGN KEY (`CodiceAlloggio`) REFERENCES `alloggi` (`Codice`),
  CONSTRAINT `FK_Possedimenti_Host` FOREIGN KEY (`CodiceHost`) REFERENCES `host` (`CodiceCliente`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `possedimenti`
--

LOCK TABLES `possedimenti` WRITE;
/*!40000 ALTER TABLE `possedimenti` DISABLE KEYS */;
INSERT INTO `possedimenti` VALUES (14,'565b09f5-d735-4c0a-a213-642573f904f0'),(15,'565b09f5-d735-4c0a-a213-642573f904f0'),(16,'565b09f5-d735-4c0a-a213-642573f904f0'),(17,'565b09f5-d735-4c0a-a213-642573f904f0'),(18,'565b09f5-d735-4c0a-a213-642573f904f0'),(20,'565b09f5-d735-4c0a-a213-642573f904f0'),(4,'d3aad9d8-aa84-4814-a11d-bf6c6f429a64'),(15,'d3aad9d8-aa84-4814-a11d-bf6c6f429a64'),(4,'d58ef7b5-cb38-44b3-a086-900ffef86d87'),(16,'d58ef7b5-cb38-44b3-a086-900ffef86d87'),(19,'d58ef7b5-cb38-44b3-a086-900ffef86d87'),(20,'d58ef7b5-cb38-44b3-a086-900ffef86d87'),(1,'d9929581-25b1-473d-8349-e4977153600f'),(2,'d9929581-25b1-473d-8349-e4977153600f'),(3,'d9929581-25b1-473d-8349-e4977153600f'),(5,'d9929581-25b1-473d-8349-e4977153600f'),(6,'d9929581-25b1-473d-8349-e4977153600f'),(7,'d9929581-25b1-473d-8349-e4977153600f'),(11,'d9929581-25b1-473d-8349-e4977153600f'),(12,'d9929581-25b1-473d-8349-e4977153600f'),(8,'e12d094d-cb32-473c-b587-7481db645eac'),(9,'e12d094d-cb32-473c-b587-7481db645eac'),(10,'e12d094d-cb32-473c-b587-7481db645eac'),(16,'e12d094d-cb32-473c-b587-7481db645eac');
/*!40000 ALTER TABLE `possedimenti` ENABLE KEYS */;
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
