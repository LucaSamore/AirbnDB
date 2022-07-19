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
-- Table structure for table `clienti`
--

DROP TABLE IF EXISTS `clienti`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clienti` (
  `Codice` varchar(255) NOT NULL,
  `Nome` varchar(50) NOT NULL,
  `Cognome` varchar(50) NOT NULL,
  `DataNascita` date NOT NULL,
  `DataCreazione` datetime NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Password` char(60) NOT NULL,
  `Telefono` char(13) DEFAULT NULL,
  `CodiceHost` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Codice`),
  KEY `FK_Codice_Host_idx` (`CodiceHost`),
  CONSTRAINT `FK_Codice_Host` FOREIGN KEY (`CodiceHost`) REFERENCES `host` (`CodiceCliente`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clienti`
--

LOCK TABLES `clienti` WRITE;
/*!40000 ALTER TABLE `clienti` DISABLE KEYS */;
INSERT INTO `clienti` VALUES ('14daa0bc-d8f3-40c9-814b-fff50ba0beb2','Simone','Giallo','1993-06-15','2022-07-13 13:25:56','simone.giallo@gmail.com','$2b$10$//pnJV./dmgMz3g7Qgq2GOUL3H0w4jtvP82YvzGQjo.56vmVhEFRK','+393457891234','14daa0bc-d8f3-40c9-814b-fff50ba0beb2'),('565b09f5-d735-4c0a-a213-642573f904f0','Mario','Rossi','2022-06-01','2022-07-03 16:14:43','test@gmail.com','$2b$10$z1JIS8E0OF71y31zSaKtXuTzraMayXMLdq8uoKL1fnJ9tuENNt6ve','','565b09f5-d735-4c0a-a213-642573f904f0'),('7a9b60a6-c805-4779-8b69-55a7964413c5','Sara','Magenta','1997-12-17','2022-07-13 13:29:43','sara.magenta@gmail.com','$2b$10$zhrwMZnBCznpmpVwdY/lneoSdwq5hGFS2qT5zZxzoaziww/Zh1ENa','+393472319087',NULL),('97e6781b-6fdf-48d8-bddb-c16f43397548','Alessia','Azzurro','2001-07-11','2022-07-13 13:28:22','alessia.azzurro@gmail.com','$2b$10$6efWOMSZ9RrcCSNEyjMLB.0FYsho3hSGe2Wx1fbXv0at9XLq8C6vy','',NULL),('9fa74bf0-92a1-45f3-94bf-e8420576838d','Roberto','Bianchi','1994-06-23','2022-07-13 13:30:47','roby.bianchi@gmail.com','$2b$10$SoJKOMQQaUsVwm.spYaxz.xM1fhp23HuIdDZ04zd3P3DpYhxMXweC',NULL,'9fa74bf0-92a1-45f3-94bf-e8420576838d'),('d0b35d90-2437-4157-b970-944183a9dd82','Francesco','Neri','1998-05-06','2022-07-13 13:26:55','francesco.neri@gmail.com','$2b$10$OcxiNZBzQTHBiYuMgcgJDexwKru4Mu4waxRfEhZBbzPGYfeflhE92','+393452341432',NULL),('d3aad9d8-aa84-4814-a11d-bf6c6f429a64','Elena','Ciano','1998-08-11','2022-07-13 13:32:28','elena.ciano@gmail.com','$2b$10$x9CKIJzPelfHuuhx9Qlx4uEyZbq22aw11wNatQhbbKVrn4bz7qZya','+393425678910','d3aad9d8-aa84-4814-a11d-bf6c6f429a64'),('d58ef7b5-cb38-44b3-a086-900ffef86d87','Luigi','Verdi','2022-05-25','2022-07-03 16:17:09','luigi@gmail.com','$2b$10$9sZYqgR6hxq2CTsp7647uuN/Lxg0nzA92puC88bkvk7LSEdd8AzCq',NULL,'d58ef7b5-cb38-44b3-a086-900ffef86d87'),('d9929581-25b1-473d-8349-e4977153600f','Martina','Arancione','1996-05-27','2022-07-13 13:35:00','martina.arancione@gmail.com','$2b$10$JdTmenQHPM.XO4j0qXX4f.A.tKIxwrh3w/HuChTITN8uMHEqEeC8W','+393475678091','d9929581-25b1-473d-8349-e4977153600f'),('e12d094d-cb32-473c-b587-7481db645eac','Luca','Viola','2000-06-20','2022-07-13 13:43:37','luca.viola@gmail.com','$2b$10$d7yEQ3Y7KfqQ9RgVND4.ZuOnmZ13ubb8nqgJP38s5sY31sFVg.7Tu',NULL,'e12d094d-cb32-473c-b587-7481db645eac');
/*!40000 ALTER TABLE `clienti` ENABLE KEYS */;
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
