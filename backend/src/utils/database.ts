import 'dotenv/config';
import mysql from 'mysql2';

const connectionPool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD
});

export default connectionPool.promise();
