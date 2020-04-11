require('dotenv').config();

var express = require('express'),
    session = require('express-session'),
    path = require('path'),
    mysql = require('mysql'),
    bcrypt = require('bcryptjs');
    auth = require('./middleware/auth');
    jwt = require('jsonwebtoken');
    config = require('config');
    bodyParser = require('body-parser');

const { check, validationResult } = require('express-validator');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

var connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    multipleStatements: true
});

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}


connection.query('USE stackoverflow');


//----------------------- ROUTES ---------------------------------------------------------------------------------------

app.get('/', function(req, res) {
    res.send("API Running...")
});

// ---------------------------------- POSTS ROUTES----------------------------------------------------------------------------

app.get('/api/posts',function(req,res){
    try {
        const q = "SELECT posts.id,posts.user_id,username,COUNT(DISTINCT answers.id) as answer_count,COUNT(DISTINCT comments.id) as comment_count,tag_id,title,posts.body,tagname,posts.created_at FROM posts JOIN posttag ON posts.id = post_id JOIN tags ON tag_id = tags.id JOIN users ON user_id = users.id LEFT JOIN answers ON answers.post_id = posts.id LEFT JOIN comments ON posts.id = comments.post_id GROUP BY posts.id ORDER BY posts.created_at DESC;";
        connection.query(q,
            function(err, results) {
            if (err) throw err;
            if (results.length === 0){
                res.status(400).json({ msg: 'There are no posts' });
            } else {
                res.json(results);
            }
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

//TOP POSTS
app.get('/api/posts/top',function(req,res){
    try {
        const q ="SELECT posts.id,posts.user_id,username,COUNT(DISTINCT answers.id) as answer_count,COUNT(DISTINCT comments.id) as comment_count,tag_id,title,posts.body,tagname,posts.created_at FROM posts JOIN posttag ON posts.id = post_id JOIN tags ON tag_id = tags.id JOIN users ON user_id = users.id LEFT JOIN answers ON answers.post_id = posts.id LEFT JOIN comments ON posts.id = comments.post_id GROUP BY posts.id ORDER BY answer_count DESC,comment_count DESC;";
        connection.query(q,
            function(err, results) {
                if (err) throw err;
                if (results.length === 0){
                    res.status(400).json({ msg: 'There are no posts' });
                } else {
                    res.json(results);
                }
            });
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

//NEWEST POSTS BASED OF A SPECIFIC TAG
app.get('/api/posts/tag/:tagname',function(req,res){
    try {
        connection.query("SELECT posts.id,posts.user_id,username,COUNT(DISTINCT answers.id) as answer_count,COUNT(DISTINCT comments.id) as comment_count,tag_id,title,posts.body,tagname,posts.created_at FROM posts JOIN posttag ON posts.id = post_id JOIN tags ON tag_id = tags.id JOIN users ON user_id = users.id LEFT JOIN answers ON answers.post_id = posts.id LEFT JOIN comments ON posts.id = comments.post_id WHERE tags.tagname = ? GROUP BY posts.id ORDER BY posts.created_at DESC;",
            [ req.params.tagname ],
            function(err, results) {
                if (err) throw err;
                if (results.length === 0){
                    res.status(400).json({ msg: 'There are no posts for this tag' });
                } else {
                    res.json(results);
                }
            });
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

app.get('/api/posts/me', auth , function(req,res){
    try {
        connection.query("SELECT posts.id,user_id,tag_id,title,body,tagname,posts.created_at FROM posts JOIN posttag ON posts.id = post_id JOIN tags ON tag_id = tags.id WHERE user_id = '"+ req.user.id +"';", function(err, results) {
            if (err) throw err;
            if (results.length === 0){
                res.status(400).json({ msg: 'There are no posts from this users' });
            } else {
                res.json(results);
            }
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

//GET SINGLE POST

app.get('/api/posts/:id',function(req,res){
    try {
        const q = "SELECT posts.id,posts.user_id,tag_id,COUNT(DISTINCT answers.id) as answer_count,COUNT(DISTINCT comments.id) as comment_count,username,title,posts.body as post_body,tagname,posts.created_at FROM posts JOIN posttag ON posts.id = post_id JOIN tags ON tag_id = tags.id JOIN users ON user_id = users.id LEFT JOIN answers ON answers.post_id = posts.id LEFT JOIN comments ON posts.id = comments.post_id WHERE posts.id = "+req.params.id+";";
        connection.query(q,
            function(err, results) {
                if (err) throw err;
                if (results.length === 0){
                    res.status(400).json({ msg: "There isn't any post by this id" });
                } else {
                    res.json(results[0]);
                }
            });
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});


//----------------------- POST CREATE ROUTE ------------------------------

/*
{
    "title": "any title",
    "body": "any body",
    "tagname": "any tagname"
}

*/


app.post(
    '/api/posts',
    [
        auth,
        [
            check('title', 'Enter a title with minimum 15 characters').isLength({min:15}),
            check('body','Enter a body with minimum 30 characters').isLength({min:30})
        ],
    ],
    function (req,res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        } else {
            try {
                connection.query(
                    "INSERT INTO posts(title,body,user_id) VALUES (?,?,?);SET @v1 := (SELECT LAST_INSERT_ID());INSERT IGNORE INTO tags(tagname) VALUES (?);SET @v2 := (SELECT id FROM tags WHERE tagname = ?);INSERT INTO posttag(post_id,tag_id) VALUES(@v1,@v2);"
                    , [req.body.title,req.body.body,req.user.id,req.body.tagname,req.body.tagname] ,
                    function(err,results) {
                        if (err) throw err;
                        res.json({ msg:"Post Added Successfully" });
                    });
            } catch (err) {
                console.log(err.message);
                res.status(500).send('Server Error');
            }

        }
});

//DELETE ROUTE
app.delete('/api/posts/:id', auth , function(req,res){
    try {
        connection.query("SELECT user_id FROM posts WHERE id = " + req.params.id ,function(err,results) {
            if (err) throw err;
            if (results[0].user_id !== req.user.id ){
                return res.status(401).json({ msg: 'User not authorized to delete' });
            } else {
                connection.query("DELETE FROM posttag WHERE post_id = ?; DELETE FROM comments WHERE post_id = ?; DELETE FROM answers WHERE post_id = ?; DELETE FROM posts WHERE id = ? ;" , [ req.params.id,req.params.id,req.params.id,req.params.id ] , function(err, results) {
                    if (err) throw err;
                    res.json({ msg: 'Post Deleted' });

                });
            }
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

// ------------------------------------------- ANSWERS ROUTES ----------------------------------------------------------


//answers from a particular users
app.get('/api/posts/answers/me', auth , function(req,res) {
    try {
        connection.query("SELECT answers.id,post_id,answers.user_id,answers.text, answers.created_at FROM answers JOIN users ON users.id = answers.user_id WHERE user_id = " + req.user.id + ";", function(err, results) {
            if (err) throw err;
            if (results.length == 0){
                res.status(400).json({ msg: 'There are no answers from this users.' });
            } else {
                res.json(results);
            }
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});



//answers of a particular post
app.get('/api/posts/answers/:id',function(req,res) {
    try {
        connection.query("SELECT answers.id,post_id,answers.user_id,username,answers.text, answers.created_at FROM answers JOIN posts ON posts.id = post_id JOIN users ON users.id = answers.user_id WHERE post_id = " + req.params.id + ";", function(err, results) {
            if (err) throw err;
            if (results.length == 0){
                res.status(400).json({ msg: 'There are no answers for this post' });
            } else {
                res.json(results);
            }
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

//add answer to post
app.post(
    '/api/posts/answers/:id',
    [
        auth,
        [
            check('text','text is required')
                .not()
                .isEmpty()
        ]
    ], function (req,res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        } else {
            try {
                connection.query(
                    'INSERT INTO answers(text,user_id,post_id) VALUES(?,?,?);'
                    , [req.body.text, req.user.id, req.params.id ] ,
                    function(err,results) {
                        if (err) throw err;
                        res.json({ msg: "Answer to the Respective Post Added Successfully" });
                    });
            } catch (err) {
                console.log(err.message);
                res.status(500).send('Server Error');
            }

        }
});

//DELETE ROUTE
app.delete('/api/answers/:id', auth , function(req,res){
    try {
        connection.query("SELECT user_id FROM answers WHERE id = " + req.params.id ,function(err,results) {
            if (err) throw err;
            if (results[0].user_id !== req.user.id ){
                return res.status(401).json({ msg: 'User not authorized to delete' });
            } else {
                connection.query("DELETE FROM answers WHERE id = " + req.params.id , function(err, results) {
                    if (err) throw err;
                    res.json({ msg: 'Answer Deleted' });
                });
            }
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});


// ---------------------------------------- COMMENTS ROUTES ------------------------------------------------------------


//comments from the logged in user
app.get('/api/posts/comments/me', auth , function(req,res) {
    try {
        connection.query("SELECT comments.id,post_id,comments.user_id,comments.body, comments.created_at FROM comments JOIN users ON users.id = comments.user_id WHERE user_id = " + req.user.id + ";", function(err, results) {
            if (err) throw err;
            if (results.length == 0){
                res.status(400).json({ msg: 'There are no comments from this user.' });
            } else {
                res.json(results);
            }
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});



//comments of a particular post
app.get('/api/posts/comments/:id',function(req,res) {
    try {
        connection.query("SELECT comments.id,post_id,comments.user_id,username,comments.body, comments.created_at FROM comments JOIN posts ON posts.id = comments.post_id JOIN users ON users.id = comments.user_id WHERE post_id = " + req.params.id + ";", function(err, results) {
            if (err) throw err;
            if (results.length == 0){
                res.status(400).json({ msg: 'There are no comments for this post' });
            } else {
                res.json(results);
            }
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

//add comment to post
app.post(
    '/api/posts/comments/:id',
    [
        auth,
        [
            check('body','body is required')
                .not()
                .isEmpty()
        ]
    ], function (req,res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        } else {
            try {
                connection.query(
                    'INSERT INTO comments(body,user_id,post_id) VALUES(?,?,?);'
                    , [req.body.body, req.user.id, req.params.id ] ,
                    function(err,results) {
                        if (err) throw err;
                        res.json({ msg: "Comment Added Successfully" });
                    });
            } catch (err) {
                console.log(err.message);
                res.status(500).send('Server Error');
            }

        }
    });

//DELETE ROUTE
app.delete('/api/comments/:id', auth , function(req,res){
    try {
        connection.query("SELECT user_id FROM comments WHERE id = ?;",[req.params.id] ,function(err,results) {
            if (err) throw err;
            if (results[0].user_id !== req.user.id ){
                return res.status(401).json({ msg: 'User not authorized to delete' });
            } else {
                connection.query("DELETE FROM comments WHERE id = ?;", [req.params.id], function(err, results) {
                    if (err) throw err;
                    res.json({ msg: 'Comment Deleted' });
                });
            }
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});


//----------------------------------------- TAGS ROUTE ----------------------------------------------------------------


app.get('/api/tags',function(req,res){
    try {
        connection.query("SELECT tags.id,posts.id,tagname,COUNT(DISTINCT posts.id) as posts_count,tags.created_at FROM tags LEFT JOIN posttag ON posttag.tag_id = tags.id LEFT JOIN posts ON posts.id = posttag.post_id GROUP BY tags.id ORDER BY posts_count DESC;",
            function(err, results) {
            if (err) throw err;
            if (results.length == 0){
                res.status(400).json({ msg: 'There are no tags' });
            } else {
                res.json(results);
            }
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});


//USERS ROUTE

//GET ALL USERS
app.get("/api/users", (req, res) => {
    try {
        connection.query("SELECT users.id,username,users.created_at,COUNT(DISTINCT posts.id) as posts_count,COUNT(DISTINCT tagname) as tags_count FROM users LEFT JOIN posts ON posts.user_id = users.id LEFT JOIN posttag ON posttag.post_id = posts.id LEFT JOIN tags ON posttag.tag_id = tags.id GROUP BY users.id ORDER BY posts_count DESC;",
            function(err, results) {
                if (err) throw err;
                if (results.length == 0){
                    res.status(400).json({ msg: 'There are no users' });
                } else {
                    res.json(results);
                }
            });
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

//GET SINGLE USER
app.get("/api/user/:id", (req, res) => {
    try {
        connection.query("SELECT users.id,username,users.created_at,COUNT(DISTINCT posts.id) as post_count,COUNT(DISTINCT tagname) as tag_count, COUNT(DISTINCT answers.id) as answer_count, COUNT(DISTINCT comments.id) as comment_count FROM users LEFT JOIN posts ON posts.user_id = users.id LEFT JOIN posttag ON posttag.post_id = posts.id LEFT JOIN tags ON tags.id = posttag.tag_id LEFT JOIN answers ON answers.user_id = users.id LEFT JOIN comments ON comments.user_id = users.id WHERE users.id = ? GROUP BY users.id;",
            [ req.params.id ],
            function(err, results) {
                if (err) throw err;
                if (results.length == 0){
                    res.status(400).json({ msg: "This user doesn't exists" });
                } else {
                    res.json(results[0]);
                }
            });
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});


//=================================== REGISTER ROUTE ===================================================================


app.post(
    '/api/users',
    [
        check('username', 'Please include a valid username').isLength({min:5}),
        check(
            'password',
            'Please enter a password with 5 or more characters'
        ).isLength({ min: 5 })
    ],
    (req,res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username,password } = req.body;

        try{

            let user;
            connection.query("SELECT * FROM users WHERE username = '"+ username +"';",async function(err, results){
                if (err) throw err;
                if (results[0]){
                    res.status(400).json({ errors: [ { msg: 'User already exists' } ] });
                } else {
                    user = { username,password };
                    const salt = await bcrypt.genSalt(10);
                    user.password = await bcrypt.hash(password, salt);

                    await connection.query("INSERT INTO users(username,password) VALUES(?,?)", [ user.username,user.password ] , function(err, results){
                        if (err) throw err;
                    });

                    connection.query("SELECT * FROM users WHERE username = '"+ username +"';", function(err, results){
                        if (err) throw err;
                        user = results[0];

                        const payload = {
                            user: {
                                id: user.id
                            }
                        };

                        jwt.sign(
                            payload,
                            config.get('jwtSecret'),
                            { expiresIn: 3600000 },
                            (err, token) => {
                                if (err) throw err;
                                res.json({ token });
                            });
                    });
                }
            });
        } catch (e) {
            console.log(e.message);
            res.status(500).send('Server Error');
        }

    }
);


// ===================================== LOGIN ROUTE OR AUTH ROUTE ==================================================


app.get('/api/auth' , auth , function (req,res) {
    try{
        var user;
        connection.query("Select id,username,created_at FROM users WHERE id = '"+ req.user.id +"';", function (err, results) {
            if (err) throw err;
            user = results[0];
            res.json(user);
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});


app.post(
    '/api/auth',
    [
        check('username', 'Please include a valid username'),
        check(
            'password',
            'Password is required'
        ).exists()
    ],
    (req,res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username,password } = req.body;

        try{

            let user;
            connection.query("SELECT * FROM users WHERE username = '"+ username +"';",async function(err, results){
                if (err) throw err;
                if (!results[0]){
                    res.status(400).json({ errors: [ { msg: 'Invalid Credentials' } ] });
                } else {
                    user = results[0];

                    const isMatch = await bcrypt.compare(password, user.password);

                    if(!isMatch){
                        return res
                            .status(400)
                            .json({ errors: [ { msg: 'Invalid Credentials' } ] });
                    } else {
                        const payload = {
                            user: {
                                id: user.id
                            }
                        };

                        jwt.sign(
                            payload,
                            config.get('jwtSecret'),
                            { expiresIn: 3600000 },
                            (err, token) => {
                                if (err) throw err;
                                res.json({ token });
                            });
                    }
                }
            });
        } catch (e) {
            console.log(e.message);
            res.status(500).send('Server Error');
        }

    }
);

//------------------------- END ------------------------------------

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));