-- MySQL dump 10.13  Distrib 8.0.28, for macos11 (x86_64)
--
-- Host: localhost    Database: project_portal
-- ------------------------------------------------------
-- Server version	8.0.28

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
-- Table structure for table `assessment`
--

DROP TABLE IF EXISTS `assessment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `assessment` (
  `assessmentID` int NOT NULL AUTO_INCREMENT,
  `criterion1` tinyint NOT NULL,
  `criterion2` tinyint NOT NULL,
  `criterion3` tinyint NOT NULL,
  `criterion4` tinyint NOT NULL,
  `criterion5` tinyint NOT NULL,
  `criterion6` tinyint NOT NULL,
  `criterion7` tinyint NOT NULL,
  `criterion8` tinyint NOT NULL,
  `criterion9` tinyint NOT NULL,
  `criterion10` tinyint NOT NULL,
  `comment` varchar(500) DEFAULT NULL,
  `visitorID` int DEFAULT NULL,
  `presentationID` int NOT NULL,
  PRIMARY KEY (`assessmentID`),
  KEY `fk_assessment_visitorID_idx` (`visitorID`),
  KEY `fk_assessment_presentationID_idx` (`presentationID`),
  CONSTRAINT `fk_assessment_presentationID` FOREIGN KEY (`presentationID`) REFERENCES `presentation` (`presentationID`),
  CONSTRAINT `fk_assessment_visitorID` FOREIGN KEY (`visitorID`) REFERENCES `visitor` (`visitorID`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assessment`
--

LOCK TABLES `assessment` WRITE;
/*!40000 ALTER TABLE `assessment` DISABLE KEYS */;
INSERT INTO `assessment` VALUES (1,5,6,7,8,3,5,6,8,6,7,'',1,1),(2,5,5,8,8,8,6,5,9,5,4,'None',2,1);
/*!40000 ALTER TABLE `assessment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `presentation`
--

DROP TABLE IF EXISTS `presentation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `presentation` (
  `presentationID` int NOT NULL AUTO_INCREMENT,
  `title` varchar(256) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `teamName` varchar(50) NOT NULL,
  `teamLogo` varchar(100) DEFAULT NULL,
  `host` varchar(20) NOT NULL,
  `date` date NOT NULL,
  `time` varchar(13) NOT NULL,
  `mode` varchar(10) DEFAULT NULL,
  `location` varchar(100) DEFAULT NULL,
  `status` varchar(10) NOT NULL,
  `staffID` varchar(12) NOT NULL,
  `unitID` int NOT NULL,
  PRIMARY KEY (`presentationID`),
  KEY `fk_presentation_unitID_idx` (`unitID`),
  KEY `fk_presentation_staffID_idx` (`staffID`),
  CONSTRAINT `fk_presentation_staffID` FOREIGN KEY (`staffID`) REFERENCES `staff` (`staffID`),
  CONSTRAINT `fk_presentation_unitID` FOREIGN KEY (`unitID`) REFERENCES `unit` (`unitID`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `presentation`
--

LOCK TABLES `presentation` WRITE;
/*!40000 ALTER TABLE `presentation` DISABLE KEYS */;
INSERT INTO `presentation` VALUES (1,'Enrolment Website by Team 9','Intelligent Form Designers, or in other words team 9, were given the task by our client Alastair McDonald of creating a streamlined University enrolment website. The aim of this project is to create a web-based application that enables prospective university students to find an efficient and fast system to enrol in universities and their courses. Through this website it is hoped that student enrolments will increase as less time is spent searching and applying alongside less prerequisite private data being handed over to universities the student will not attend.','Intelligent Form Designers',NULL,'Murdoch University','2022-05-21','10:05 – 11:00','In-person','245.2.035 (Robertson Lecture Theatre)','Upcoming','STA-112233',1),(2,'The CourseLoop Data','Murdoch University has engaged us to propose and develop a solution that can demonstrate to the universities the time, staffing and potential budgeting impact of scheduled unit offerings. Our solution is to create a client/server application that will use the CourseLoop data, interpret this data, and show time-budget requirements through user-friendly graphs. Further, users will be able to apply filters on data to examine data on a micro-level for individual units, disciplines, colleges and academics.','HR HEROES','/team_logo/hr-logo.png','Murdoch University','2022-05-21','11:15 – 11:45','Virtual','Example link to Zoom/Microsoft','Ongoing','STA-112233',1),(3,'The Chat App','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc id porttitor elit, quis pulvinar velit. Suspendisse potenti. Proin non interdum tellus, non accumsan purus. Duis ac blandit quam, ut condimentum felis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean ultrices nibh mi. Vestibulum tempor luctus fringilla. Etiam malesuada tortor nisl, in interdum mi blandit vestibulum. Phasellus eleifend lectus nibh, eu aliquam nunc fermentum eleifend. Nulla sed ornare odio. Etiam sollicitudin nulla lectus, sit amet molestie quam facilisis eu. Aliquam erat volutpat. Morbi consequat a dolor a varius. Nam scelerisque dignissim ipsum sed fermentum. Morbi eget malesuada nunc, at imperdiet justo.','Super Kids',NULL,'Murdoch University','2022-01-22','10:05-11:20','Virtual','Example link to Zoom/Microsoft','Closed','STA-112233',1),(10,'TEST','test','test','/team_logo/1649227145760-murdoch.png','test','2022-04-06','test','Virtual','test','Ongoing','STA-112233',1),(11,'testtte','test','set','','test','2022-04-06','test','Virtual','test','Upcoming','STA-112233',1);
/*!40000 ALTER TABLE `presentation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `presenter`
--

DROP TABLE IF EXISTS `presenter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `presenter` (
  `studentID` varchar(12) NOT NULL,
  `firstName` varchar(30) NOT NULL,
  `lastName` varchar(30) NOT NULL,
  `email` varchar(100) NOT NULL,
  PRIMARY KEY (`studentID`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `presenter`
--

LOCK TABLES `presenter` WRITE;
/*!40000 ALTER TABLE `presenter` DISABLE KEYS */;
INSERT INTO `presenter` VALUES ('STU-3051830','Patrick','Hoag','patrickjhoag@student.murdoch.edu.au'),('STU-3456789','Jane','Doe','jane.doe@student.murdoch.edu.au'),('STU-535-9678','Nora','Johnson','noradjohnson@student.murdoch.edu.au'),('STU-5363312','Brian','Teel','brianlteel@student.murdoch.edu.au'),('STU-9687562','France','Vinson','franceswvinson@student.murdoch.edu.au');
/*!40000 ALTER TABLE `presenter` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `presenter_assigned`
--

DROP TABLE IF EXISTS `presenter_assigned`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `presenter_assigned` (
  `presentationID` int NOT NULL,
  `studentID` varchar(12) NOT NULL,
  PRIMARY KEY (`presentationID`,`studentID`),
  KEY `fk_presenter_studentID_idx` (`studentID`),
  CONSTRAINT `fk_presenter_assigned_presentationID` FOREIGN KEY (`presentationID`) REFERENCES `presentation` (`presentationID`),
  CONSTRAINT `fk_presenter_studentID` FOREIGN KEY (`studentID`) REFERENCES `presenter` (`studentID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `presenter_assigned`
--

LOCK TABLES `presenter_assigned` WRITE;
/*!40000 ALTER TABLE `presenter_assigned` DISABLE KEYS */;
INSERT INTO `presenter_assigned` VALUES (1,'STU-3051830'),(1,'STU-3456789'),(2,'STU-535-9678'),(3,'STU-5363312'),(3,'STU-9687562');
/*!40000 ALTER TABLE `presenter_assigned` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project`
--

DROP TABLE IF EXISTS `project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project` (
  `projectID` int NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `projectTeam` varchar(100) NOT NULL,
  `file` varchar(100) DEFAULT NULL,
  `staffID` varchar(12) NOT NULL,
  `unitID` int NOT NULL,
  `projectBanner` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`projectID`),
  KEY `fk_staffID_idx` (`staffID`),
  KEY `fk_unitID` (`unitID`),
  CONSTRAINT `fk_staffID` FOREIGN KEY (`staffID`) REFERENCES `staff` (`staffID`),
  CONSTRAINT `fk_unitID` FOREIGN KEY (`unitID`) REFERENCES `unit` (`unitID`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project`
--

LOCK TABLES `project` WRITE;
/*!40000 ALTER TABLE `project` DISABLE KEYS */;
INSERT INTO `project` VALUES (1,'Project Test 1','Curabitur ultrices elit sit amet turpis dapibus interdum. Proin accumsan massa eget augue vestibulum, tempor blandit mauris condimentum. Ut sodales fermentum lectus, porta aliquet magna suscipit in. Mauris vel sagittis nulla. Donec ullamcorper massa vel metus rhoncus, et vulputate ligula varius. Maecenas quis malesuada enim. Morbi tincidunt blandit maximus. Suspendisse sodales lectus ut vulputate congue. Mauris vitae eleifend tortor. Praesent nisi lorem, bibendum sit amet blandit ut, egestas quis urna. Aenean convallis feugiat pretium.','Member 1, Member 2, Member 3, Member 4','/uploads/project/1648198278570-1647237021595-test (13).pdf','STA-112233',2,'/project_banner/banner-project1.jpg'),(2,'Project Test 2','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam semper ligula quis molestie tempor. Morbi dapibus massa a metus pellentesque facilisis. Nullam sodales posuere laoreet. Quisque fringilla vulputate tortor, vel hendrerit mauris varius non. Nullam viverra a orci nec finibus. Proin elementum, arcu et tempus fermentum, est nibh tempor lectus, ut condimentum dui nunc eget felis. Suspendisse sollicitudin augue non augue faucibus hendrerit.','Member 1, Member 2, Member 3, Member 4','/uploads/project/1648198278570-1647237021595-test (13).pdf','STA-112233',1,'/project_banner/building-project2.jpg'),(3,'Project Test 3','Fusce eget consequat felis, at consequat dui. Nam odio libero, accumsan a felis eget, auctor rutrum massa. Ut convallis eros ac quam ullamcorper bibendum. Donec id pharetra tortor. Donec at eros tempor, malesuada neque venenatis, rhoncus nulla. Duis luctus justo justo, at sollicitudin enim laoreet non. In non aliquam nisi, ut suscipit sem.','Member 1, Member 2, Member 3, Member 4','/uploads/project/1648198278570-1647237021595-test (13).pdf','STA-112233',1,NULL),(4,'Project Test 4','Mauris suscipit tristique mattis. Ut vulputate, sapien sit amet ornare convallis, arcu velit dapibus risus, quis iaculis nunc lectus cursus erat. Donec interdum ligula eget efficitur vulputate. Etiam venenatis ex a massa maximus, eget fringilla urna varius. Duis quis congue risus, ut mattis ligula. Donec efficitur tincidunt elit, at rhoncus purus iaculis a.','Member 1, Member 2, Member 3, Member 4','/uploads/project/1648198278570-1647237021595-test (13).pdf','STA-112233',1,NULL);
/*!40000 ALTER TABLE `project` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proposal`
--

DROP TABLE IF EXISTS `proposal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `proposal` (
  `proposalID` int NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL,
  `discipline` varchar(50) DEFAULT NULL,
  `file` varchar(100) NOT NULL,
  `status` varchar(10) NOT NULL,
  `dateSubmitted` date NOT NULL,
  `visitorID` int NOT NULL,
  PRIMARY KEY (`proposalID`),
  KEY `fk_proposal_visitorID_idx` (`visitorID`),
  CONSTRAINT `fk_proposal_visitorID` FOREIGN KEY (`visitorID`) REFERENCES `visitor` (`visitorID`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proposal`
--

LOCK TABLES `proposal` WRITE;
/*!40000 ALTER TABLE `proposal` DISABLE KEYS */;
/*!40000 ALTER TABLE `proposal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `registration`
--

DROP TABLE IF EXISTS `registration`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `registration` (
  `registrationID` int NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `visitorID` int NOT NULL,
  `presentationID` int NOT NULL,
  PRIMARY KEY (`registrationID`),
  KEY `fk_registration_visitorID_idx` (`visitorID`),
  KEY `fk_registration_presentationID_idx` (`presentationID`),
  CONSTRAINT `fk_registration_presentationID` FOREIGN KEY (`presentationID`) REFERENCES `presentation` (`presentationID`),
  CONSTRAINT `fk_registration_visitorID` FOREIGN KEY (`visitorID`) REFERENCES `visitor` (`visitorID`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `registration`
--

LOCK TABLES `registration` WRITE;
/*!40000 ALTER TABLE `registration` DISABLE KEYS */;
INSERT INTO `registration` VALUES (1,'2022-03-11',1,2),(2,'2022-03-18',2,1),(3,'2022-04-21',1,1);
/*!40000 ALTER TABLE `registration` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `staff`
--

DROP TABLE IF EXISTS `staff`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `staff` (
  `staffID` varchar(12) NOT NULL,
  `firstName` varchar(30) NOT NULL,
  `lastName` varchar(30) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(60) NOT NULL,
  `accessType` varchar(15) DEFAULT NULL,
  `createdTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`staffID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `staff`
--

LOCK TABLES `staff` WRITE;
/*!40000 ALTER TABLE `staff` DISABLE KEYS */;
INSERT INTO `staff` VALUES ('STA-112233','Jane','Doe','proj-test@email.com','test123','Administrator','2022-03-07 09:13:13'),('STA-332211','John','Smith','proj-test2@email.com','test123','Teaching Staff','2022-03-07 09:15:21');
/*!40000 ALTER TABLE `staff` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `unit`
--

DROP TABLE IF EXISTS `unit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `unit` (
  `unitID` int NOT NULL AUTO_INCREMENT,
  `unitCode` varchar(6) NOT NULL,
  `unitName` varchar(256) NOT NULL,
  `discipline` varchar(50) NOT NULL,
  PRIMARY KEY (`unitID`),
  UNIQUE KEY `unitCode_UNIQUE` (`unitCode`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `unit`
--

LOCK TABLES `unit` WRITE;
/*!40000 ALTER TABLE `unit` DISABLE KEYS */;
INSERT INTO `unit` VALUES (1,'ICT302','IT Professional Practice Project','Information Technology'),(2,'ICT365','Software Development Frameworks','IT, Media and Communications');
/*!40000 ALTER TABLE `unit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `visitor`
--

DROP TABLE IF EXISTS `visitor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `visitor` (
  `visitorID` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(30) NOT NULL,
  `lastName` varchar(30) NOT NULL,
  `email` varchar(100) NOT NULL,
  `affiliation` varchar(45) DEFAULT NULL,
  `category` varchar(8) NOT NULL,
  `orgName` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`visitorID`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=75 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `visitor`
--

LOCK TABLES `visitor` WRITE;
/*!40000 ALTER TABLE `visitor` DISABLE KEYS */;
INSERT INTO `visitor` VALUES (1,'Anne','Tesla','34113348@student.murdoch.edu.au','None','Student','Company 2202'),(2,'Kim','West','example@email.com','None','Visitor','My Company 101'),(55,'Test','Test','test@test.com','Test','Visitor','');
/*!40000 ALTER TABLE `visitor` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-06 16:37:36
