import 'dotenv/config';
import mysql from 'mysql2';

const connectionPool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'spaced-learning-project',
  password: 'ruKanga2025#'
});

export default connectionPool.promise();
