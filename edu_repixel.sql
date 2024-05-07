-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 22, 2024 at 12:35 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `edu_repixel`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin_users`
--

CREATE TABLE `admin_users` (
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin_users`
--

INSERT INTO `admin_users` (`user_id`) VALUES
(11);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(12) DEFAULT NULL,
  `password` char(100) DEFAULT NULL,
  `email` text DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `collage_name` varchar(255) DEFAULT NULL,
  `collage_id` int(11) DEFAULT NULL,
  `profile_img` text DEFAULT 'Static Photo',
  `role` varchar(255) DEFAULT NULL,
  `language` varchar(255) DEFAULT NULL,
  `user_avarge` decimal(10,0) DEFAULT NULL,
  `major` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `password`, `email`, `first_name`, `last_name`, `collage_name`, `profile_img`, `role`, `language`, `user_avarge`, `major`, `created_at`) VALUES
(11, 'qlz_v', '$2b$10$6G81l04hiylhpEPjRrTNOuWmJQv7vHGVaubYqv3FEWGxSrwTkHzee', 'qoqoazzeh@gmail.com', 'Qatada', 'Azzeh', 'Applied Science Private University | ASU', 'http://res.cloudinary.com/dju2xufnr/image/upload/v1704545256/sample/pvl4scr1iglwdvd4l4sp.jpg', 'User', 'en-US', NULL, 'CS', '2024-01-06 18:18:28'),
(12, 'lz', '$2b$10$6G81l04hiylhpEPjRrTNOuWmJQv7vHGVaubYqv3FEWGxSrwTkHzee', 'azzehqatada@gmail.com', 'Azzeh', 'Qatada', 'Applied Science Private University | ASU', 'http://res.cloudinary.com/dju2xufnr/image/upload/v1704545256/sample/pvl4scr1iglwdvd4l4sp.jpg', 'User', 'en-US', NULL, 'CS', '2024-01-21 21:05:47');

-- --------------------------------------------------------

--
-- Table structure for table `user_exams`
--

CREATE TABLE `user_exams` (
  `exam_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `user_grade` int(11) DEFAULT NULL,
  `taken_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `full_grade` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `user_exams`
--
ALTER TABLE `user_exams`
  ADD PRIMARY KEY (`exam_id`),
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `user_exams`
--
ALTER TABLE `user_exams`
  ADD CONSTRAINT `user_exams_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
