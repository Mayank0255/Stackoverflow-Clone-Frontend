require('dotenv').config();

const express = require('express'),
    path = require('path'),
    mysql = require('mysql'),
    bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000;

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

const connection = mysql.createConnection({
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
global.connection = connection;

//DEFINE ROUTES
app.use('/api/auth', require('./server/routes/api/auth'));
app.use('/api/users', require('./server/routes/api/users'));
app.use('/api/posts', require('./server/routes/api/posts'));
app.use('/api/tags', require('./server/routes/api/tags'));
app.use('/api/posts/answers', require('./server/routes/api/answers'));
app.use('/api/posts/comments', require('./server/routes/api/comments'));



//----------------------- ROUTES ---------------------------------------------------------------------------------------

app.get('/', (req, res) => {
    res.send('API Running...');
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));