const dotenv = require('dotenv');
const express = require('express');
const path = require('path');
const http = require('http');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const index = require('./server/routes/index.route');

const PORT = process.env.PORT || 5000;

const app = express();

dotenv.config();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
const server = http.createServer(app);

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
app.use('/api', index);

server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
});