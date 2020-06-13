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

SELECT posts.id, username, COUNT(answers.id) FROM posts JOIN users ON users.id = posts.user_id LEFT JOIN comments ON comments.post_id = posts.id LEFT JOIN answers ON answers.post_id = posts.id GROUP BY p
osts.id,answers.id;

sum(case when level = 'exec' then 1 else 0 end) AS ExecCount

SUM(CASE WHEN answers.id > 0 then 1 else 0 end)

SELECT posts.id,posts.user_id,username,COUNT(CASE WHEN answers.id > 0 THEN 1 ELSE 0 END) as answer_count FROM posts JOIN posttag ON posts.id = post_id JOIN tags ON tag_id = tags.id JOIN users ON user_id
= users.id LEFT JOIN answers ON answers.post_id = posts.id LEFT JOIN comments ON posts.id = comments.post_id GROUP BY posts.id;

