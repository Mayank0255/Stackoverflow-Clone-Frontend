var express = require('express'),
    path = require('path'),
    request=require('request'),
    methodOverride = require('method-override'),
    mysql = require('mysql'),
    bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

app.get('/', function(req, res) {
    res.send("API Running...")
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));