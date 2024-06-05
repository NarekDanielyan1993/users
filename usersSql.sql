-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: users
-- ------------------------------------------------------
-- Server version	8.0.36

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
-- Table structure for table `files`
--

DROP TABLE IF EXISTS `files`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `files` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `files`
--

LOCK TABLES `files` WRITE;
/*!40000 ALTER TABLE `files` DISABLE KEYS */;
INSERT INTO `files` VALUES (7,'b77abcf8c849ac0b37b80bf04.jpg'),(8,'b77abcf8c849ac0b37b80bf08.jpg');
/*!40000 ALTER TABLE `files` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `surname` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gender` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `fileId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_key` (`email`),
  UNIQUE KEY `users_fileId_key` (`fileId`),
  CONSTRAINT `users_fileId_fkey` FOREIGN KEY (`fileId`) REFERENCES `files` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'test90@mail.com','user','danielyann','male','$2a$12$0SESeNB8EI23Lb./GvSe3ud6mhH7xglfv4DdZKl1MXlgIwZyl4q1m','2024-06-05 10:11:28.001',7),(2,'test120@mail.com','user120',NULL,'female','$2a$12$6q/TLYqSm7s02Ntn8t1sROv6q.blCkpvOrS.IwnmjXL6DGD5bdVVa','2024-06-05 10:14:55.022',8),(3,'test3@mail.com','user3',NULL,NULL,'$2a$12$J2SOGE55hUTMJ8QCZgz2XuTZCKapJ/Doj320ijHHayJr1yoJx.7v.','2024-06-05 10:15:01.450',NULL),(4,'test4@mail.com','user4',NULL,NULL,'$2a$12$3RuUIIxdmgrX.wS3Mt7NC.mz1ub.w03C/1Qezz0/bo3OXIwIIJI3K','2024-06-05 10:15:08.048',NULL),(5,'test5@mail.com','user5',NULL,NULL,'$2a$12$NCNsAwnczSWz.0h//tjmoe62v7c43UQHmzSq/vS88eTaMdWh.LzuG','2024-06-05 10:15:14.120',NULL),(6,'test6@mail.com','user6',NULL,NULL,'$2a$12$AEgCF5OdcuSCxtzT7iE.cuLxuBCxeg4abh4ID9YfnEsmypr62yiVK','2024-06-05 10:15:19.704',NULL),(7,'test7@mail.com','user7',NULL,NULL,'$2a$12$n6oslM3ssNRahhp63dMtAOLPtfQrxLR4AwXt3PT7DiZLiaEMF9pgO','2024-06-05 10:15:25.540',NULL),(8,'test8@mail.com','user8',NULL,NULL,'$2a$12$LaE0TmRrIqUdSRKTVjpPVekjlomsvGnKRDxh664nj4nR6R38Wb8jm','2024-06-05 10:15:31.159',NULL),(9,'test9@mail.com','user9',NULL,NULL,'$2a$12$IOmSMuAreq6fe0L8e1BGmO1oSVU5oEtG65NNL/tdJwsoF1eyu91hC','2024-06-05 10:15:36.018',NULL),(10,'test10@mail.com','user10',NULL,NULL,'$2a$12$WD8neUvNPbGCRi4kqiI6i.d8Qfd/tUs0oIluY8OXOBESJn86VXHSu','2024-06-05 10:15:43.395',NULL),(11,'test11@mail.com','user11',NULL,NULL,'$2a$12$/zE21Pzo6/FkIghm55KW.uBcLce/MTbeOkXxvCJykrokdlYFEYFEu','2024-06-05 10:15:49.807',NULL),(12,'test12@mail.com','user12',NULL,NULL,'$2a$12$Soqi4QXvssdHpGhNzff5E.UlvI.u66MjlGAQRfuAnQMfj8tgrBj7u','2024-06-05 10:15:55.397',NULL),(13,'test13@mail.com','user13',NULL,NULL,'$2a$12$M0GyLgEUMfbjqEn8tHKQ4uly5B2AO8BoaBR7AQRB5SY/RVcCmmeku','2024-06-05 10:16:01.160',NULL),(14,'test14@mail.com','user14',NULL,NULL,'$2a$12$IYc8vnFEW6421aAuBvUoBOIlXQPcbl1I3OwU5HnPI4Yo5EOGNLXNm','2024-06-05 10:16:14.710',NULL),(15,'test15@mail.com','user15',NULL,NULL,'$2a$12$p2AVHgI1asWRucS.luAxduV/Dwl8VSjhIK9W.tBpMNBYBhp/BBHze','2024-06-05 10:16:20.862',NULL),(16,'test16@mail.com','user16',NULL,NULL,'$2a$12$r6FdBEyAj2j8S.a3TqW02eWMTfrCVfA4NpHl.mQC0r5lYiIhJ8huK','2024-06-05 10:16:27.100',NULL),(17,'test17@mail.com','user17',NULL,NULL,'$2a$12$e7afolbKPa.6gcnVyHFfteHGSLNrUkgb/7QyI9ILW5s57FW3lJjCC','2024-06-05 10:16:33.066',NULL),(18,'test18@mail.com','user18',NULL,NULL,'$2a$12$.r8YY333gIhpzNbNjliEqe/AA27sUq0J6tpFF3QNWDXOCTEBkjZOK','2024-06-05 10:16:38.205',NULL),(19,'test19@mail.com','user19',NULL,NULL,'$2a$12$2Jv1HFebaQgFJaoJMF.YHOQ/PyCkbSLfgpp8OTYBgkZX2RfLf9hza','2024-06-05 10:16:43.206',NULL),(20,'test20@mail.com','user20',NULL,NULL,'$2a$12$bAIZIlK.0kzC44CuWC972u9/bdP8XvqHCI850wXxn2N.Vhy.lwGQy','2024-06-05 10:16:49.266',NULL),(21,'test21@mail.com','user21',NULL,NULL,'$2a$12$dMc8duuEOw2Q36GYkX1sf.uVxBCh0EWrBiiYNZfR/JLYhb4A00l4u','2024-06-05 10:16:53.867',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-05 14:23:38
