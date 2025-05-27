import express from 'express';
import db from './src/utils/database';
import bodyParser from 'body-parser';

// Routes
import authRoutes from './src/routes/auth';

db.execute('SELECT * FROM users')
  .then((result) => console.log(result))
  .catch((error) => console.log(error));

const app = express();

app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);

app.get('/', (req, res, next) => {
  res.send('Welcome to the spaced learning project!');
});

app.listen(3000);
