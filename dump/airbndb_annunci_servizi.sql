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
-- Table structure for table `annunci_servizi`
--

DROP TABLE IF EXISTS `annunci_servizi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `annunci_servizi` (
  `CodiceAnnuncio` int NOT NULL,
  `NomeServizio` varchar(100) NOT NULL,
  `Incluso` tinyint DEFAULT NULL,
  PRIMARY KEY (`CodiceAnnuncio`,`NomeServizio`),
  KEY `FK_Nome_Servizio_Annuncio_idx` (`NomeServizio`),
  CONSTRAINT `FK_Annuncio_Servizio_Annuncio` FOREIGN KEY (`CodiceAnnuncio`) REFERENCES `annunci` (`CodiceAlloggio`),
  CONSTRAINT `FK_Nome_Servizio_Annuncio` FOREIGN KEY (`NomeServizio`) REFERENCES `servizi` (`Nome`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `annunci_servizi`
--

LOCK TABLES `annunci_servizi` WRITE;
/*!40000 ALTER TABLE `annunci_servizi` DISABLE KEYS */;
INSERT INTO `annunci_servizi` VALUES (1,'Acqua calda',1),(1,'HDTV',1),(1,'Wifi veloce',1),(2,'Acqua calda',1),(2,'HDTV',1),(2,'Wifi veloce',0),(3,'Acqua calda',1),(3,'HDTV',1),(3,'Wifi veloce',1),(4,'Acqua calda',1),(4,'HDTV',1),(4,'Wifi veloce',0),(5,'Acqua calda',1),(5,'HDTV',0),(5,'Wifi veloce',1),(6,'Acqua calda',1),(6,'HDTV',1),(6,'Wifi veloce',1),(7,'Acqua calda',1),(7,'HDTV',0),(7,'Wifi veloce',0),(8,'Acqua calda',1),(8,'HDTV',1),(8,'Wifi veloce',0),(9,'Acqua calda',1),(9,'HDTV',1),(9,'Wifi veloce',1),(10,'Acqua calda',1),(10,'HDTV',1),(10,'Wifi veloce',1),(11,'Acqua calda',1),(11,'HDTV',0),(11,'Wifi veloce',1),(12,'Acqua calda',1),(12,'HDTV',1),(12,'Wifi veloce',1),(13,'Acqua calda',1),(13,'Allarme antincendio',1),(13,'Armadio',1),(13,'Asciugacapelli',1),(13,'Asciugatrice Gratis',1),(13,'Box bebè portatile/culla di viaggio',1),(13,'Cuscini e coperte extra',0),(13,'Estintore',0),(13,'Ferro da stiro',1),(13,'Fornelli',1),(13,'Forno',1),(13,'Forno a microonde',1),(13,'Freezer',1),(13,'Frigorifero',1),(13,'HDTV',0),(13,'Kit di prontosoccorso',0),(13,'Lavastoviglie',0),(13,'Lavatrice Gratis',0),(13,'Libri e materiale di lettura',0),(13,'Parcheggio gratuito',0),(13,'Piatti e posate',0),(13,'Prodotti per la pulizia',0),(13,'Protezioni sul camino',0),(13,'Rilevatore di monossido di carbonio',0),(13,'Security camera presenti nella proprietà',1),(13,'Servizi di base per cucinare',1),(13,'Vasca da bagno',1),(13,'Wifi veloce',1),(14,'Acqua calda',1),(14,'Allarme antincendio',1),(14,'Armadio',1),(14,'Asciugacapelli',1),(14,'Asciugatrice Gratis',1),(14,'Box bebè portatile/culla di viaggio',1),(14,'Cuscini e coperte extra',1),(14,'Estintore',1),(14,'Ferro da stiro',1),(14,'Fornelli',1),(14,'Forno',1),(14,'Forno a microonde',1),(14,'Freezer',1),(14,'Frigorifero',1),(14,'HDTV',1),(14,'Kit di prontosoccorso',1),(14,'Lavastoviglie',1),(14,'Lavatrice Gratis',1),(14,'Libri e materiale di lettura',1),(14,'Parcheggio gratuito',1),(14,'Piatti e posate',1),(14,'Prodotti per la pulizia',1),(14,'Protezioni sul camino',1),(14,'Rilevatore di monossido di carbonio',1),(14,'Security camera presenti nella proprietà',1),(14,'Servizi di base per cucinare',1),(14,'Vasca da bagno',1),(14,'Wifi veloce',1),(15,'Acqua calda',0),(15,'Allarme antincendio',0),(15,'Armadio',1),(15,'Asciugacapelli',0),(15,'Asciugatrice Gratis',0),(15,'Box bebè portatile/culla di viaggio',1),(15,'Cuscini e coperte extra',0),(15,'Estintore',0),(15,'Ferro da stiro',1),(15,'Fornelli',1),(15,'Forno',0),(15,'Forno a microonde',0),(15,'Freezer',0),(15,'Frigorifero',0),(15,'HDTV',0),(15,'Kit di prontosoccorso',0),(15,'Lavastoviglie',1),(15,'Lavatrice Gratis',1),(15,'Libri e materiale di lettura',1),(15,'Parcheggio gratuito',1),(15,'Piatti e posate',1),(15,'Prodotti per la pulizia',1),(15,'Protezioni sul camino',0),(15,'Rilevatore di monossido di carbonio',0),(15,'Security camera presenti nella proprietà',0),(15,'Servizi di base per cucinare',0),(15,'Vasca da bagno',1),(15,'Wifi veloce',1),(16,'Acqua calda',1),(16,'Allarme antincendio',1),(16,'Armadio',1),(16,'Asciugacapelli',1),(16,'Asciugatrice Gratis',1),(16,'Box bebè portatile/culla di viaggio',1),(16,'Cuscini e coperte extra',1),(16,'Estintore',0),(16,'Ferro da stiro',0),(16,'Fornelli',0),(16,'Forno',0),(16,'Forno a microonde',0),(16,'Freezer',1),(16,'Frigorifero',1),(16,'HDTV',1),(16,'Kit di prontosoccorso',1),(16,'Lavastoviglie',1),(16,'Lavatrice Gratis',1),(16,'Libri e materiale di lettura',0),(16,'Parcheggio gratuito',0),(16,'Piatti e posate',0),(16,'Prodotti per la pulizia',0),(16,'Protezioni sul camino',1),(16,'Rilevatore di monossido di carbonio',1),(16,'Security camera presenti nella proprietà',0),(16,'Servizi di base per cucinare',1),(16,'Vasca da bagno',1),(16,'Wifi veloce',1),(17,'Acqua calda',1),(17,'Allarme antincendio',1),(17,'Armadio',1),(17,'Asciugacapelli',1),(17,'Asciugatrice Gratis',1),(17,'Box bebè portatile/culla di viaggio',1),(17,'Cuscini e coperte extra',1),(17,'Estintore',1),(17,'Ferro da stiro',1),(17,'Fornelli',1),(17,'Forno',1),(17,'Forno a microonde',1),(17,'Freezer',1),(17,'Frigorifero',1),(17,'HDTV',1),(17,'Kit di prontosoccorso',1),(17,'Lavastoviglie',1),(17,'Lavatrice Gratis',1),(17,'Libri e materiale di lettura',1),(17,'Parcheggio gratuito',1),(17,'Piatti e posate',1),(17,'Prodotti per la pulizia',1),(17,'Protezioni sul camino',1),(17,'Rilevatore di monossido di carbonio',1),(17,'Security camera presenti nella proprietà',1),(17,'Servizi di base per cucinare',1),(17,'Vasca da bagno',1),(17,'Wifi veloce',1),(18,'Acqua calda',1),(18,'Allarme antincendio',1),(18,'Armadio',1),(18,'Asciugacapelli',1),(18,'Asciugatrice Gratis',1),(18,'Box bebè portatile/culla di viaggio',1),(18,'Cuscini e coperte extra',0),(18,'Estintore',0),(18,'Ferro da stiro',0),(18,'Fornelli',0),(18,'Forno',0),(18,'Forno a microonde',0),(18,'Freezer',1),(18,'Frigorifero',1),(18,'HDTV',0),(18,'Kit di prontosoccorso',0),(18,'Lavastoviglie',0),(18,'Lavatrice Gratis',0),(18,'Libri e materiale di lettura',0),(18,'Parcheggio gratuito',1),(18,'Piatti e posate',0),(18,'Prodotti per la pulizia',1),(18,'Protezioni sul camino',1),(18,'Rilevatore di monossido di carbonio',0),(18,'Security camera presenti nella proprietà',0),(18,'Servizi di base per cucinare',0),(18,'Vasca da bagno',1),(18,'Wifi veloce',1),(19,'Acqua calda',1),(19,'Allarme antincendio',1),(19,'Armadio',1),(19,'Asciugacapelli',1),(19,'Asciugatrice Gratis',1),(19,'Box bebè portatile/culla di viaggio',1),(19,'Cuscini e coperte extra',1),(19,'Estintore',1),(19,'Ferro da stiro',1),(19,'Fornelli',1),(19,'Forno',0),(19,'Forno a microonde',0),(19,'Freezer',0),(19,'Frigorifero',1),(19,'HDTV',1),(19,'Kit di prontosoccorso',0),(19,'Lavastoviglie',1),(19,'Lavatrice Gratis',1),(19,'Libri e materiale di lettura',0),(19,'Parcheggio gratuito',0),(19,'Piatti e posate',0),(19,'Prodotti per la pulizia',1),(19,'Protezioni sul camino',1),(19,'Rilevatore di monossido di carbonio',0),(19,'Security camera presenti nella proprietà',0),(19,'Servizi di base per cucinare',1),(19,'Vasca da bagno',1),(19,'Wifi veloce',1),(20,'Acqua calda',1),(20,'Allarme antincendio',1),(20,'Armadio',1),(20,'Asciugacapelli',1),(20,'Asciugatrice Gratis',1),(20,'Box bebè portatile/culla di viaggio',1),(20,'Cuscini e coperte extra',1),(20,'Estintore',0),(20,'Ferro da stiro',0),(20,'Fornelli',0),(20,'Forno',1),(20,'Forno a microonde',1),(20,'Freezer',1),(20,'Frigorifero',1),(20,'HDTV',1),(20,'Kit di prontosoccorso',1),(20,'Lavastoviglie',1),(20,'Lavatrice Gratis',0),(20,'Libri e materiale di lettura',0),(20,'Parcheggio gratuito',0),(20,'Piatti e posate',0),(20,'Prodotti per la pulizia',0),(20,'Protezioni sul camino',0),(20,'Rilevatore di monossido di carbonio',0),(20,'Security camera presenti nella proprietà',0),(20,'Servizi di base per cucinare',0),(20,'Vasca da bagno',0),(20,'Wifi veloce',0);
/*!40000 ALTER TABLE `annunci_servizi` ENABLE KEYS */;
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
