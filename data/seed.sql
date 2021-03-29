USE stack_overflow_v2;

INSERT INTO users(username, password)
VALUES
("mayank", "$2a$10$9cQmVqe2Hz6aKX0YqYgvXeDKCbKHhj330ujNxDR7k/yubLoIWiswe"),
("rithik", "$2a$10$/mA3np4tWg7hsj.Jl9SGmO9BglTllhZxnLrHI7ATWT4VoraU2KC7i"),
("shubh", "$2a$10$d0n1G5dNVTfGJEvrSxRU9OZrABWQ9ICBL24lONWYWrIUFp11Fx6c."),
("jaidev", "$2a$10$iIGjYwWQUtrSMuh9RVQYNupBalea0Q6qeBzrtHhlw/5bpWWeRscDe"),
("harshal", "$2a$10$dISBkirxSiwQnhy2m8SoHuJ2wgYGLkwsF9He5UWVOMLBo2NtKkKxa"),
("hritik", "$2a$10$u9xQmmo6ejTv/ex021wq9eKZVpIpfwdpE6RrRqp5M6P/qOzDBXh22"),
("shadowsaver", "$2a$10$.qGwjVv/39t.nLEg5DFpkO3oz72MCNsOF6a6ijuMKBmluaH5qAfIq");

INSERT INTO posts(title, body, user_id) VALUES ("LocalDate and LocalDateTime in a server which runs in EST vs UTC", "I am trying to understand LocalDate and LocalDateTime. Since they do not carry zone info, how does it work for now() on two different time zone.", 1);
SET @v1 := (SELECT LAST_INSERT_ID());
INSERT IGNORE INTO tags(tagname, description) VALUES ("java", "Java is a popular high-level programming language. Use this tag when you&#39;re having problems using or understanding the language itself. This tag is rarely used alone and is most often used in conjunction with [spring], [spring-boot], [jakarta-ee], [android], [javafx], [gradle] and [maven].");
SET @v2 := (SELECT id FROM tags WHERE tagname = "java");
INSERT INTO posttag(post_id, tag_id) VALUES(@v1, @v2);

INSERT INTO posts(title, body, user_id) VALUES ("Flutter: Specify ListTile height", "The issue is The tile here toke around more than half of the page which makes it looks inconsistent. I want to limit the height of the tile, I have tried putting them in a row and a container and it doesn't work. Any HELP will be appreciated.", 4);
SET @v1 := (SELECT LAST_INSERT_ID());
INSERT IGNORE INTO tags(tagname, description) VALUES ("flutter", "Flutter is an open-source UI software development kit created by Google. It is used to develop applications for Android, iOS, Linux, Mac, Windows, Google Fuchsia and the web from a single codebase.");
SET @v2 := (SELECT id FROM tags WHERE tagname = "flutter");
INSERT INTO posttag(post_id, tag_id) VALUES(@v1, @v2);

INSERT INTO posts(title, body, user_id) VALUES ("Programmatically navigate using react router", "With react-router I can use the Link element to create links which are natively handled by react router. I see internally it calls this.context.transitionTo(...).", 5);
SET @v1 := (SELECT LAST_INSERT_ID());
INSERT IGNORE INTO tags(tagname, description) VALUES ("reactjs", "React is a JavaScript library for building user interfaces. It uses a declarative, component-based paradigm and aims to be both efficient and flexible.");
SET @v2 := (SELECT id FROM tags WHERE tagname = "reactjs");
INSERT INTO posttag(post_id, tag_id) VALUES(@v1, @v2);

INSERT INTO posts(title, body, user_id) VALUES ("Why is processing a sorted array faster than processing an unsorted array?", "Here is a piece of C++ code that shows some very peculiar behavior. For some strange reason, sorting the data miraculously makes the code almost six times faster:", 3);
SET @v1 := (SELECT LAST_INSERT_ID());
INSERT IGNORE INTO tags(tagname, description) VALUES ("java", "Java is a popular high-level programming language. Use this tag when you&#39;re having problems using or understanding the language itself. This tag is rarely used alone and is most often used in conjunction with [spring], [spring-boot], [jakarta-ee], [android], [javafx], [gradle] and [maven].");
SET @v2 := (SELECT id FROM tags WHERE tagname = "java");
INSERT INTO posttag(post_id, tag_id) VALUES(@v1, @v2);

INSERT INTO posts(title, body, user_id) VALUES ("Is there a unique Android device ID?", "Do Android devices have a unique ID, and if so, what is a simple way to access it using Java?", 2);
SET @v1 := (SELECT LAST_INSERT_ID());
INSERT IGNORE INTO tags(tagname, description) VALUES ("android", "Android is Google&#39;s mobile operating system, used for programming or developing digital devices (Smartphones, Tablets, Automobiles, TVs, Wear, Glass, IoT). For topics related to Android, use Android-specific tags such as android-intent, android-activity, android-adapter, etc. For questions other than development or programming, but related to the Android framework, use this link: https://android.stackexchange.com.");
SET @v2 := (SELECT id FROM tags WHERE tagname = "android");
INSERT INTO posttag(post_id, tag_id) VALUES(@v1, @v2);

INSERT INTO answers(body, user_id, post_id)
VALUES
("Just remove the Expanded Widget to avoid fill the space available and use a parent Container with a fixed height, the same as the itemExtent value:", 1, 4),
("There is a new useHistory hook in React Router >5.1.0 if you are using React >16.8.0 and functional components.", 2, 5),
("While you are correct that LocalDateTime and LocalDate don’t contain any time zone information, their now methods do use time zones. Either the one passed to them, or if you use the no-arg variant, the default time zone of the JVM.", 1, 3);

INSERT INTO comments(body, user_id, post_id)
VALUES
("I need more information", 1, 4),
("I think I can help you in this", 1, 4),
("I need more information", 2, 5),
("You sure you don't want funcs to be an array, if you're using numeric indices? Just a heads up.", 1, 5),
("I need more information", 3, 1);
