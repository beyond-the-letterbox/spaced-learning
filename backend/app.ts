import express from 'express';
import db from './src/utils/database.utils';
import bodyParser from 'body-parser';

// Routes
import authRoutes from './src/routes/auth.routes';
import cardsRoutes from './src/routes/cards.routes';
import notesRoutes from './src/routes/notes.routes';

db.execute('SELECT * FROM users')
  .then((result) => console.log(result))
  .catch((error) => console.log(error));

const app = express();

app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/cards', cardsRoutes);
app.use('/api/notes', notesRoutes);

app.get('/', (req, res, next) => {
  res.send('Welcome to the spaced learning project!');
});

app.listen(3000);
