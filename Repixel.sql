CREATE TABLE `users` (
  `user_id` integer AUTO_INCREMENT PRIMARY KEY,
  `username` varchar(12),
  `password` CHAR(100),
  `email` text,
  `first_name` varchar(255),
  `last_name` varchar(255),
  `collage_name` varchar(255),
  `profile_img` text DEFAULT "Static Photo",
  `role` varchar(255) DEFAULT "User",
  `language` varchar(255) DEFAULT "en-US",
  `user_avarge` decimal DEFAULT 0.0,
  `major` varchar(255),
  `created_at` timestamp
);

CREATE TABLE `Admin_Users` (
  `user_id` integer,
  `password` CHAR(100)
);

CREATE TABLE `user_exams` (
`exam_id` int PRIMARY KEY,
`user_id` int,
`user_grade` int,
`full_grade` int,
  `taken_at` timestamp
);

ALTER TABLE `Admin_Users` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

ALTER TABLE `user_exams` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);
