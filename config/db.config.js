const mysql = require('mysql2');

// environment variable config
const dotenv = require('dotenv');

dotenv.config();

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  multipleStatements: true,
});

// Ping database to check for common exception errors.
pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('Database connection was closed.');
    } else if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('Database has too many connections.');
    } else if (err.code === 'ECONNREFUSED') {
      console.error('Database connection was refused.');
    } else {
      console.error(err.message);
    }
  }

  if (connection) {
    console.log('Connected to the MySQL server.');
    connection.release();
  }
});

module.exports = pool;
