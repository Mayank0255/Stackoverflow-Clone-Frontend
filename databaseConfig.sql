CREATE DATABASE stackoverflow;

USE stackoverflow;


 CREATE TABLE users(
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(100),
      created_at TIMESTAMP DEFAULT NOW()
 );

 CREATE TABLE posts(
     id INT AUTO_INCREMENT PRIMARY KEY,
     title VARCHAR(250),
     body MEDIUMTEXT,
     created_at TIMESTAMP DEFAULT NOW(),
     user_id INT NOT NULL,
     FOREIGN KEY(user_id) REFERENCES users(id)
 );

 CREATE TABLE answers(
     id INT AUTO_INCREMENT PRIMARY KEY,
     body MEDIUMTEXT,
     created_at TIMESTAMP DEFAULT NOW(),
     post_id INT NOT NULL,
     FOREIGN KEY(post_id) REFERENCES posts(id),
     user_id INT NOT NULL,
     FOREIGN KEY(user_id) REFERENCES users(id)
 );

 CREATE TABLE comments(
     id INT AUTO_INCREMENT PRIMARY KEY,
     body MEDIUMTEXT,
     created_at TIMESTAMP DEFAULT NOW(),
     post_id INT NOT NULL,
     FOREIGN KEY(post_id) REFERENCES posts(id),
     user_id INT NOT NULL,
     FOREIGN KEY(user_id) REFERENCES users(id)
 );

 CREATE TABLE tags(
    id INT AUTO_INCREMENT PRIMARY KEY,
    tagname VARCHAR(255) UNIQUE,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE posttag(
    post_id INT NOT NULL,
    FOREIGN KEY(post_id) REFERENCES posts(id),
    tag_id INT NOT NULL,
    FOREIGN KEY(tag_id) REFERENCES tags(id),
    created_at TIMESTAMP DEFAULT NOW(),
    PRIMARY KEY(post_id, tag_id)
);