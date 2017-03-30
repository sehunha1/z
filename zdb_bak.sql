-- MySQL dump 10.13  Distrib 5.7.17, for macos10.12 (x86_64)
--
-- Host: localhost    Database: zdb
-- ------------------------------------------------------
-- Server version	5.7.17

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `board`
--

DROP TABLE IF EXISTS `board`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `board` (
  `bnum` int(11) NOT NULL AUTO_INCREMENT COMMENT '게시글일련번호',
  `mnum` int(11) NOT NULL COMMENT '회원일련번호',
  `mtnum` int(11) NOT NULL COMMENT '모임일련번호',
  `titl` varchar(255) NOT NULL COMMENT '제목',
  `cont` text NOT NULL COMMENT '내용',
  `bdate` datetime NOT NULL COMMENT '게시글 작성일자',
  PRIMARY KEY (`bnum`),
  KEY `FK_link_TO_board` (`mnum`,`mtnum`),
  CONSTRAINT `FK_link_TO_board` FOREIGN KEY (`mnum`, `mtnum`) REFERENCES `link` (`mnum`, `mtnum`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COMMENT='게시글';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `board`
--

LOCK TABLES `board` WRITE;
/*!40000 ALTER TABLE `board` DISABLE KEYS */;
INSERT INTO `board` VALUES (1,21,1,'필독! 준비물!','개인 등산장비, 물, 회비 2만원씩은 꼭 챙겨오셔야 합니다!','2017-03-29 14:02:45'),(2,21,1,'유우머','고급 유우머~\n웃다가세요~','2017-03-29 14:10:13'),(3,25,1,'저번 산행','저번 산행 너무 즐거웠어요 단체사진올려요','2017-03-29 14:12:07'),(4,27,1,'산불났대요....','북한산에 산불났대요.. 진화작업이 잘돼야할텐데..','2017-03-29 14:13:31'),(5,27,1,'진화작업중','진화작업이 잘되고있나봐요..','2017-03-29 14:14:24'),(6,31,1,'가입인사','안녕하세요 신입회원 오지혁 인사드립니다. 잘부탁드립니다.','2017-03-29 14:15:36');
/*!40000 ALTER TABLE `board` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cal`
--

DROP TABLE IF EXISTS `cal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cal` (
  `cnum` int(11) NOT NULL AUTO_INCREMENT COMMENT '일정일련번호',
  `mnum` int(11) NOT NULL COMMENT '회원일련번호',
  `mtnum` int(11) NOT NULL COMMENT '모임일련번호',
  `cdate` date NOT NULL COMMENT '선택날짜',
  `ctime` varchar(50) NOT NULL COMMENT '선택시간',
  PRIMARY KEY (`cnum`),
  KEY `FK_link_TO_cal` (`mnum`,`mtnum`),
  CONSTRAINT `FK_link_TO_cal` FOREIGN KEY (`mnum`, `mtnum`) REFERENCES `link` (`mnum`, `mtnum`)
) ENGINE=InnoDB AUTO_INCREMENT=285 DEFAULT CHARSET=utf8 COMMENT='일정';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cal`
--

LOCK TABLES `cal` WRITE;
/*!40000 ALTER TABLE `cal` DISABLE KEYS */;
INSERT INTO `cal` VALUES (14,27,1,'2017-04-08','아침'),(15,21,1,'2017-04-09','아침'),(16,27,1,'2017-04-09','아침'),(17,25,1,'2017-04-22','아침'),(18,21,1,'2017-04-23','아침'),(19,25,1,'2017-04-23','아침'),(20,27,1,'2017-04-23','아침'),(21,28,1,'2017-04-23','아침'),(28,36,2,'2017-04-29','점심'),(29,21,2,'2017-04-29','아침'),(30,35,2,'2017-04-29','아침'),(31,36,2,'2017-04-30','아침'),(32,21,2,'2017-04-30','아침'),(33,35,2,'2017-04-30','아침'),(50,27,3,'2017-04-04','밤'),(51,21,3,'2017-04-05','저녁'),(52,24,3,'2017-04-05','저녁'),(53,30,3,'2017-04-05','저녁'),(54,34,3,'2017-04-06','저녁'),(55,24,3,'2017-04-07','저녁'),(56,27,3,'2017-04-07','저녁'),(57,30,3,'2017-04-07','밤'),(227,38,4,'2017-04-08','점심'),(228,22,4,'2017-04-08','점심'),(229,9,4,'2017-04-08','낮'),(230,22,4,'2017-04-09','점심'),(231,38,4,'2017-04-15','점심'),(232,22,4,'2017-04-15','점심'),(233,1,4,'2017-04-15','아침'),(234,6,4,'2017-04-15','점심'),(235,7,4,'2017-04-15','아침'),(236,8,4,'2017-04-15','점심'),(237,9,4,'2017-04-15','낮'),(238,10,4,'2017-04-15','아침'),(239,15,4,'2017-04-15','아침'),(240,22,4,'2017-04-16','점심'),(241,1,4,'2017-04-16','아침'),(242,6,4,'2017-04-16','점심'),(243,7,4,'2017-04-16','아침'),(244,10,4,'2017-04-16','점심'),(245,13,4,'2017-04-16','점심'),(246,15,4,'2017-04-16','아침'),(247,38,4,'2017-04-22','점심'),(248,3,4,'2017-04-22','아침'),(249,8,4,'2017-04-22','점심'),(250,10,4,'2017-04-22','아침'),(251,13,4,'2017-04-22','점심'),(252,15,4,'2017-04-22','아침'),(253,3,4,'2017-04-23','아침'),(254,15,4,'2017-04-23','아침'),(255,3,4,'2017-04-29','아침'),(256,7,4,'2017-04-29','아침'),(257,8,4,'2017-04-29','점심'),(258,13,4,'2017-04-29','점심'),(259,3,4,'2017-04-30','아침'),(260,7,4,'2017-04-30','아침'),(276,33,5,'2017-05-05','저녁'),(277,25,5,'2017-05-05','저녁'),(278,33,5,'2017-05-12','저녁'),(279,26,5,'2017-05-12','저녁'),(280,25,5,'2017-05-12','저녁'),(281,33,5,'2017-05-19','저녁'),(282,29,5,'2017-05-19','저녁'),(283,26,5,'2017-05-19','저녁'),(284,29,5,'2017-05-26','저녁');
/*!40000 ALTER TABLE `cal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `file`
--

DROP TABLE IF EXISTS `file`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `file` (
  `fnum` int(11) NOT NULL AUTO_INCREMENT COMMENT '첨부파일일련번호',
  `bnum` int(11) NOT NULL COMMENT '게시글일련번호',
  `link` varchar(255) NOT NULL COMMENT '링크주소',
  `type` varchar(50) NOT NULL COMMENT '파일종류',
  PRIMARY KEY (`fnum`),
  KEY `FK_board_TO_file` (`bnum`),
  CONSTRAINT `FK_board_TO_file` FOREIGN KEY (`bnum`) REFERENCES `board` (`bnum`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COMMENT='첨부파일';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `file`
--

LOCK TABLES `file` WRITE;
/*!40000 ALTER TABLE `file` DISABLE KEYS */;
INSERT INTO `file` VALUES (1,1,'1490763764469_2','picture'),(2,2,'1490764212902_6','picture'),(3,3,'1490764326218_7','picture'),(4,4,'1490764411166_8','picture'),(5,5,'1490764463327_9','picture'),(6,6,'1490764535634_10','picture');
/*!40000 ALTER TABLE `file` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `link`
--

DROP TABLE IF EXISTS `link`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `link` (
  `mnum` int(11) NOT NULL COMMENT '회원일련번호',
  `mtnum` int(11) NOT NULL COMMENT '모임일련번호',
  `boss` char(1) NOT NULL DEFAULT 'n' COMMENT '방장여부',
  `stat` char(1) NOT NULL COMMENT '모임투표상태',
  `accept` char(1) NOT NULL DEFAULT 'n' COMMENT '모임승낙여부',
  PRIMARY KEY (`mnum`,`mtnum`),
  KEY `FK_meet_TO_link` (`mtnum`),
  CONSTRAINT `FK_meet_TO_link` FOREIGN KEY (`mtnum`) REFERENCES `meet` (`mtnum`),
  CONSTRAINT `FK_memb_TO_link` FOREIGN KEY (`mnum`) REFERENCES `memb` (`mnum`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='연결정보(모임멤버등....)';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `link`
--

LOCK TABLES `link` WRITE;
/*!40000 ALTER TABLE `link` DISABLE KEYS */;
INSERT INTO `link` VALUES (1,4,'n','y','y'),(2,4,'n','n','y'),(3,4,'n','y','y'),(4,4,'n','n','n'),(5,4,'n','n','y'),(6,4,'n','y','y'),(7,4,'n','y','y'),(8,4,'n','y','y'),(9,4,'n','y','y'),(10,4,'n','y','y'),(11,4,'n','n','y'),(12,4,'n','n','n'),(13,4,'n','y','y'),(14,4,'n','n','y'),(15,4,'n','y','y'),(16,4,'n','n','y'),(17,4,'n','n','n'),(18,4,'n','n','n'),(19,4,'n','n','n'),(20,4,'n','n','n'),(21,1,'y','y','y'),(21,2,'n','y','y'),(21,3,'y','y','y'),(21,4,'n','n','n'),(21,5,'y','n','y'),(22,4,'y','y','y'),(23,4,'n','n','n'),(24,3,'n','y','y'),(25,1,'n','y','y'),(25,5,'n','y','y'),(26,5,'n','y','y'),(27,1,'n','y','y'),(27,3,'n','y','y'),(28,1,'n','y','y'),(28,3,'n','n','n'),(29,5,'n','y','y'),(30,3,'n','y','y'),(31,1,'n','n','y'),(32,5,'n','n','y'),(33,5,'n','y','y'),(34,1,'n','n','y'),(34,3,'n','y','y'),(35,2,'n','y','y'),(36,2,'y','y','y'),(37,2,'n','n','y'),(38,4,'n','y','y');
/*!40000 ALTER TABLE `link` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `list`
--

DROP TABLE IF EXISTS `list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `list` (
  `ltnum` int(11) NOT NULL AUTO_INCREMENT COMMENT '장소일련번호',
  `lname` varchar(255) NOT NULL COMMENT '장소명',
  `addr` varchar(255) NOT NULL COMMENT '주소',
  `mnum` int(11) NOT NULL COMMENT '회원일련번호',
  `mtnum` int(11) NOT NULL COMMENT '모임일련번호',
  `addr_x` varchar(30) NOT NULL COMMENT 'X좌표',
  `addr_y` varchar(30) NOT NULL COMMENT 'Y좌표',
  PRIMARY KEY (`ltnum`),
  UNIQUE KEY `UIX_list` (`lname`,`addr`,`mtnum`),
  KEY `FK_link_TO_list` (`mnum`,`mtnum`),
  CONSTRAINT `FK_link_TO_list` FOREIGN KEY (`mnum`, `mtnum`) REFERENCES `link` (`mnum`, `mtnum`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COMMENT='장소리스트(API)';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `list`
--

LOCK TABLES `list` WRITE;
/*!40000 ALTER TABLE `list` DISABLE KEYS */;
INSERT INTO `list` VALUES (1,'청계산입구역 신분당선','서울 서초구 신원동',21,1,'37.448353693350036','127.05471810460756'),(2,'관악산입구','서울 관악구 신림동',25,1,'37.4681784705502','126.94626275976478'),(3,'팔당역 경의중앙선','경기 남양주시 와부읍 팔당리',36,2,'37.54736004324759','127.24396493052095'),(4,'양평군청','경기 양평군 양평읍 양근리 448-8',36,2,'37.49178891340078','127.48757646668142'),(5,'시티헌터플스방','서울 강남구 역삼동 820-2',21,3,'37.49943522938179','127.02762680758428'),(6,'리가플스방','서울 강남구 역삼동 818-15',24,3,'37.499435159988806','127.02793893005045'),(7,'상계3,4동 주민센터','서울 노원구 상계동 37-7',38,4,'37.67291441567981','127.08323378052066'),(8,'남태령역 4호선','서울 서초구 방배동',22,4,'37.46425154369142','126.98908324838129'),(9,'강남역 2호선','서울 강남구 역삼동',33,5,'37.498083647347194','127.02800178194782'),(10,'종로3가역 1호선','서울 종로구 종로3가',29,5,'37.57042161536182','126.99215358310289');
/*!40000 ALTER TABLE `list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `loc`
--

DROP TABLE IF EXISTS `loc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `loc` (
  `lnum` int(11) NOT NULL AUTO_INCREMENT COMMENT '장소선택일련번호',
  `ltnum` int(11) NOT NULL COMMENT '장소일련번호',
  `mnum` int(11) NOT NULL COMMENT '회원일련번호',
  `mtnum` int(11) NOT NULL COMMENT '모임일련번호',
  PRIMARY KEY (`lnum`),
  UNIQUE KEY `UIX_loc` (`ltnum`,`mnum`,`mtnum`),
  KEY `FK_link_TO_loc` (`mnum`,`mtnum`),
  CONSTRAINT `FK_link_TO_loc` FOREIGN KEY (`mnum`, `mtnum`) REFERENCES `link` (`mnum`, `mtnum`),
  CONSTRAINT `FK_list_TO_loc` FOREIGN KEY (`ltnum`) REFERENCES `list` (`ltnum`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8 COMMENT='장소선택';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loc`
--

LOCK TABLES `loc` WRITE;
/*!40000 ALTER TABLE `loc` DISABLE KEYS */;
INSERT INTO `loc` VALUES (1,1,21,1),(3,1,25,1),(4,1,27,1),(5,1,28,1),(2,2,25,1),(8,3,21,2),(10,3,35,2),(6,3,36,2),(9,4,21,2),(11,4,35,2),(7,4,36,2),(12,5,21,3),(14,5,27,3),(16,5,30,3),(18,5,34,3),(13,6,24,3),(15,6,27,3),(17,6,30,3),(19,6,34,3),(23,7,1,4),(25,7,3,4),(27,7,7,4),(28,7,8,4),(29,7,9,4),(31,7,13,4),(33,7,15,4),(21,7,22,4),(20,7,38,4),(24,8,1,4),(26,8,6,4),(30,8,10,4),(32,8,13,4),(22,8,22,4),(37,9,25,5),(36,9,26,5),(34,9,33,5),(35,10,29,5);
/*!40000 ALTER TABLE `loc` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `meet`
--

DROP TABLE IF EXISTS `meet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `meet` (
  `mtnum` int(11) NOT NULL AUTO_INCREMENT COMMENT '모임일련번호',
  `titl` varchar(255) NOT NULL COMMENT '모임명',
  `cont` text COMMENT '모임내용',
  `mtdesc` varchar(50) NOT NULL COMMENT '모임분류',
  `dline` date NOT NULL COMMENT '투표기한',
  `photo` varchar(255) DEFAULT NULL COMMENT '사진',
  `mstat` varchar(30) NOT NULL COMMENT '모임진행상태',
  `floc` varchar(255) DEFAULT NULL COMMENT '확정장소',
  `fdate` varchar(50) DEFAULT NULL COMMENT '확정날짜',
  `ftime` varchar(50) DEFAULT NULL COMMENT '확정시간',
  PRIMARY KEY (`mtnum`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COMMENT='모임';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `meet`
--

LOCK TABLES `meet` WRITE;
/*!40000 ALTER TABLE `meet` DISABLE KEYS */;
INSERT INTO `meet` VALUES (1,'산악 동호회 정기산행','강남구 산악 동호회 4월 정기산행','친목','2017-03-28','1490763418409_1','fin','[청계산입구역 신분당선] 서울 서초구 신원동','2017-04-23','아침'),(2,'중미산 드라이브','이번엔 중미산으로 드라이브갑시다. 4/29, 30 중 골라주세요.','친목','2017-03-28','1490764728710_12','wait',NULL,NULL,NULL),(3,'위닝일레븐 대회','위닝일레븐 대회개최합니다. 우승상금 5만원!','친목','2017-03-28','1490765769366_0','wait',NULL,NULL,NULL),(4,'자바89기 연탄배달 봉사활동','비트 자바89기 연탄배달 봉사활동하러갑니다. 따뜻한 세상을 만듭시다~','기타','2017-04-06','1490767062643_2','ing',NULL,NULL,NULL),(5,'레고동호회 5월 정모','레고동호회 5월 정모 개최합니다~ 5월 전일 선택가능하니 편하신날 선택해주세요~','친목','2017-04-26','1490770367463_0','ing',NULL,NULL,NULL);
/*!40000 ALTER TABLE `meet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `memb`
--

DROP TABLE IF EXISTS `memb`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `memb` (
  `mnum` int(11) NOT NULL AUTO_INCREMENT COMMENT '회원일련번호',
  `email` varchar(40) NOT NULL COMMENT '이메일',
  `name` varchar(50) NOT NULL COMMENT '이름(닉네임)',
  `pwd` varchar(50) NOT NULL COMMENT '암호',
  `photo` varchar(255) DEFAULT NULL COMMENT '사진',
  `kakao` varchar(60) DEFAULT NULL COMMENT '카카오톡',
  `fcbk` varchar(60) DEFAULT NULL COMMENT '페이스북',
  `quit` char(1) NOT NULL DEFAULT 'n' COMMENT '탈퇴여부',
  PRIMARY KEY (`mnum`),
  UNIQUE KEY `UIX_memb` (`email`),
  UNIQUE KEY `UIX_memb2` (`kakao`),
  UNIQUE KEY `UIX_memb3` (`fcbk`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8 COMMENT='회원';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `memb`
--

LOCK TABLES `memb` WRITE;
/*!40000 ALTER TABLE `memb` DISABLE KEYS */;
INSERT INTO `memb` VALUES (1,'kimbr@bit.com','김보라','*556A1819C902459389465119AFDEF298638C520B','1490768415592_3',NULL,NULL,'n'),(2,'kimyj@bit.com','김용진','*556A1819C902459389465119AFDEF298638C520B','1490768482330_4',NULL,NULL,'n'),(3,'kimwj@bit.com','김우종','*556A1819C902459389465119AFDEF298638C520B','1490768524718_5',NULL,NULL,'n'),(4,'kimjn@bit.com','김재녕','*556A1819C902459389465119AFDEF298638C520B','profile-default.png',NULL,NULL,'n'),(5,'kimjh@bit.com','김지환','*556A1819C902459389465119AFDEF298638C520B','1490768571526_6',NULL,NULL,'n'),(6,'kimhk@bit.com','김희경','*556A1819C902459389465119AFDEF298638C520B','1490768616324_7',NULL,NULL,'n'),(7,'minkk@bit.com','민경기','*556A1819C902459389465119AFDEF298638C520B','1490768655573_8',NULL,NULL,'n'),(8,'parksh@bit.com','박수희','*556A1819C902459389465119AFDEF298638C520B','1490768701164_9',NULL,NULL,'n'),(9,'seodh@bit.com','서동훈','*556A1819C902459389465119AFDEF298638C520B','1490768736369_10',NULL,NULL,'n'),(10,'shinjw@bit.com','신종우','*556A1819C902459389465119AFDEF298638C520B','profile-default.png',NULL,NULL,'n'),(11,'ohys@bit.com','오용석','*556A1819C902459389465119AFDEF298638C520B','1490768779944_11',NULL,NULL,'n'),(12,'wonye@bit.com','원요엘','*556A1819C902459389465119AFDEF298638C520B','profile-default.png',NULL,NULL,'n'),(13,'yoosa@bit.com','유신애','*556A1819C902459389465119AFDEF298638C520B','1490768823266_12',NULL,NULL,'n'),(14,'leesh@bit.com','이석환','*556A1819C902459389465119AFDEF298638C520B','1490768858387_13',NULL,NULL,'n'),(15,'leesb@bit.com','이성복','*556A1819C902459389465119AFDEF298638C520B','1490768899065_14',NULL,NULL,'n'),(16,'jeongsk@bit.com','정선교','*556A1819C902459389465119AFDEF298638C520B','1490768962115_15',NULL,NULL,'n'),(17,'jeongyc@bit.com','정용창','*556A1819C902459389465119AFDEF298638C520B','profile-default.png',NULL,NULL,'n'),(18,'jeongjy@bit.com','정지연','*556A1819C902459389465119AFDEF298638C520B','profile-default.png',NULL,NULL,'n'),(19,'jijh@bit.com','지정훈','*556A1819C902459389465119AFDEF298638C520B','profile-default.png',NULL,NULL,'n'),(20,'cheonjy@bit.com','천지연','*556A1819C902459389465119AFDEF298638C520B','profile-default.png',NULL,NULL,'n'),(21,'hash@bit.com','하세훈','*556A1819C902459389465119AFDEF298638C520B','1490763300734_0',NULL,NULL,'n'),(22,'hande@bit.com','한동은','*556A1819C902459389465119AFDEF298638C520B','1490769020568_16',NULL,NULL,'n'),(23,'hanoj@bit.com','한옥주','*556A1819C902459389465119AFDEF298638C520B','profile-default.png',NULL,NULL,'n'),(24,'hanji@high.com','한재익','*556A1819C902459389465119AFDEF298638C520B','1490765903122_1',NULL,NULL,'n'),(25,'namhk@high.com','남현구','*556A1819C902459389465119AFDEF298638C520B','1490763813838_3',NULL,NULL,'n'),(26,'kimth@high.com','김태훈','*556A1819C902459389465119AFDEF298638C520B','1490770517404_1',NULL,NULL,'n'),(27,'baekh@high.com','배기환','*556A1819C902459389465119AFDEF298638C520B','1490763902192_4',NULL,NULL,'n'),(28,'jeongjy@high.com','정준용','*556A1819C902459389465119AFDEF298638C520B','1490763970081_5',NULL,NULL,'n'),(29,'parkch@high.com','박찬호','*556A1819C902459389465119AFDEF298638C520B','1490770559375_2',NULL,NULL,'n'),(30,'jeonwy@high.com','전우영','*556A1819C902459389465119AFDEF298638C520B','1490766051920_2',NULL,NULL,'n'),(31,'ohjh@high.com','오지혁','*556A1819C902459389465119AFDEF298638C520B','1490766756017_0',NULL,NULL,'n'),(32,'kimdy@high.com','김대용','*556A1819C902459389465119AFDEF298638C520B','1490770608609_3',NULL,NULL,'n'),(33,'kimsk@high.com','김성규','*556A1819C902459389465119AFDEF298638C520B','1490770657482_4',NULL,NULL,'n'),(34,'jeonjk@high.com','전정근','*556A1819C902459389465119AFDEF298638C520B','1490766197398_3',NULL,NULL,'n'),(35,'jangjw@mid.com','장재원','*556A1819C902459389465119AFDEF298638C520B','1490764979741_13',NULL,NULL,'n'),(36,'choish@mid.com','최승환','*556A1819C902459389465119AFDEF298638C520B','1490764623526_11',NULL,NULL,'n'),(37,'parkkm@mid.com','박광모','*556A1819C902459389465119AFDEF298638C520B','1490766872460_1',NULL,NULL,'n'),(38,'kimkw@bit.com','김건우','*556A1819C902459389465119AFDEF298638C520B','1490769064162_17',NULL,NULL,'n');
/*!40000 ALTER TABLE `memb` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `time`
--

DROP TABLE IF EXISTS `time`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `time` (
  `ldnum` int(11) NOT NULL AUTO_INCREMENT COMMENT '제한날짜일련번호',
  `mtnum` int(11) NOT NULL COMMENT '모임일련번호',
  `sdate` date NOT NULL COMMENT '시작일',
  `edate` date NOT NULL COMMENT '종료일',
  PRIMARY KEY (`ldnum`),
  UNIQUE KEY `UIX_time` (`mtnum`),
  CONSTRAINT `FK_meet_TO_time` FOREIGN KEY (`mtnum`) REFERENCES `meet` (`mtnum`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COMMENT='기간(제한날짜)';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `time`
--

LOCK TABLES `time` WRITE;
/*!40000 ALTER TABLE `time` DISABLE KEYS */;
INSERT INTO `time` VALUES (1,1,'2017-04-08','2017-04-23'),(2,2,'2017-04-29','2017-04-30'),(3,3,'2017-04-03','2017-04-07'),(4,4,'2017-04-08','2017-04-30'),(5,5,'2017-05-01','2017-05-31');
/*!40000 ALTER TABLE `time` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-03-29 16:08:48
