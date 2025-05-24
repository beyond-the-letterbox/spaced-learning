import express from 'express';
import db from './src/utils/database';
import bodyParser from 'body-parser';
import * as usersRoutes from './src/routes/users';
import { PrismaClient } from "@prisma/client";


db.execute('SELECT * FROM users')
  .then((result) => console.log(result))
  .catch((error) => console.log(error));

const app = express();
const prisma = new PrismaClient();

app.use(bodyParser.json());

// Routes

app.get('/', (req, res, next) => {
  res.send('Welcome to the spaced learning project!');
});

app.listen(3000);
