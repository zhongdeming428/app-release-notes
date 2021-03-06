USE d_app_release_notes;

CREATE TABLE IF NOT EXISTS t_user (
  `username` VARCHAR(20) NOT NULL PRIMARY KEY COMMENT "账户名",
  `password` VARCHAR(30) NOT NULL COMMENT "密码",
  `create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=10000000 DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS t_note (
  `title` VARCHAR(20) NOT NULL COMMENT "标题",
  `path` VARCHAR(255) NOT NULL COMMENT "文章路径",
  `id` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT "文章 ID",
  `author` VARCHAR(20) NOT NULL COMMENT "作者名称",
  `create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=10000000 DEFAULT CHARSET=utf8mb4;