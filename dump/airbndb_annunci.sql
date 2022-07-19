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
-- Table structure for table `annunci`
--

DROP TABLE IF EXISTS `annunci`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `annunci` (
  `CodiceAlloggio` int NOT NULL,
  `Titolo` varchar(100) NOT NULL,
  `Descrizione` text NOT NULL,
  `Disponibile` tinyint NOT NULL,
  `PrezzoPerNotte` decimal(10,2) NOT NULL,
  `CostoServizio` decimal(10,2) NOT NULL,
  `CostoPulizia` decimal(10,2) NOT NULL,
  `Tasse` decimal(10,2) NOT NULL,
  PRIMARY KEY (`CodiceAlloggio`),
  CONSTRAINT `FK_Annuncio_Alloggio` FOREIGN KEY (`CodiceAlloggio`) REFERENCES `alloggi` (`Codice`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `annunci`
--

LOCK TABLES `annunci` WRITE;
/*!40000 ALTER TABLE `annunci` DISABLE KEYS */;
INSERT INTO `annunci` VALUES (1,'Casa bellissima','La mia casa è bellissima, veniteci!',1,563.00,123.00,150.00,41.00),(2,'Stanza privata carina','Stanza privata molto carina',1,63.00,23.00,10.00,11.00),(3,'Stanza condivisa eccezionale','Questa stanza è eccezionale',1,70.00,20.00,15.00,20.00),(4,'Casa sensazionale','Una casa sensazionale, da provare!',1,1024.00,220.00,130.00,50.00),(5,'Casa meravigliosa','Una casa meravigliosamente meravigliosa',1,980.00,330.00,110.00,70.00),(6,'Casa allucinante','Soggiorna in una casa allucinante',1,760.00,180.00,90.00,62.00),(7,'Casa spaziale','Una casa molto spaziosa',1,823.00,111.00,56.00,32.00),(8,'Stanza privata egregia','Una stanza per chi vuole stare riservato',1,43.00,15.00,8.00,12.00),(9,'Una stanzosa condivisione','A chi piace condividere',1,249.00,60.00,46.00,57.00),(10,'Stanza condivisa coraggiosa','Solo per chi ha coraggio da vendere',1,5.00,0.00,0.00,2.00),(11,'Stanza privata fresca','Una stanza privata per chi soffre particolarmente il caldo',1,86.00,23.00,8.00,12.00),(12,'Stanza privata sileziosa','Dedicata a chi piace stare in pace con il mondo',1,100.00,34.00,12.00,9.00),(13,'Primo test aggiunta annuncio','Questo è il primo test di aggiunta di un nuovo annuncio. Spero funzioni :)',1,500.00,200.00,120.00,80.00),(14,'OOOOOOOOOYEH','Questo è il secondo test dell\'aggiunta di un nuovo annuncio. Spero vada tutto bene :)',1,670.00,240.00,180.00,190.00),(15,'Test update annuncio','test 3 inserimento annuncio',1,123.00,23.00,34.00,41.00),(16,'OH BELLOOO :)','heyoooo test numero 4 babyyy',1,678.00,342.00,134.00,412.00),(17,'Terzo testi di update','test numero 5',1,345.00,123.00,23.00,56.00),(18,'secondo test di update','test numero 5',1,345.00,123.00,23.00,56.00),(19,'TEST N6','ayoooooooooooo',1,781.00,255.00,54.00,514.00),(20,'Annuncio Casa Top','HEY',1,765.00,43.00,45.00,25.00);
/*!40000 ALTER TABLE `annunci` ENABLE KEYS */;
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
