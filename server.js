import bodyParser from 'body-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import path from 'path';
import http from 'http';
import express from 'express';
import pool from './config/db.config.js';
import index from './server/routes/index.route.js';

const app = express();

// compressing api response
app.use(compression());

// logger
app.use(morgan('dev'));

// cors enable
app.options('*', cors());
app.use(cors({origin: 'http://localhost:5000'}));

// security config
app.use(helmet());

// body-parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// database connection
pool.query(`USE ${process.env.DATABASE}`);
global.pool = pool;

// connection with client setup
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// all the api routes
app.use('/api', index);

// port initialized
const PORT = process.env.PORT || 5000;

// server setup
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
