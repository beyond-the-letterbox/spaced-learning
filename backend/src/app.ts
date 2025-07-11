import express from 'express';
import db from './utils/database.utils';
import bodyParser from 'body-parser';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

// Routes
import authRoutes from './routes/auth.routes';
import cardsRoutes from './routes/cards.routes';
import notesRoutes from './routes/notes.routes';
import relationsRoutes from './routes/relations.routes';
import reviewHistoryRoutes from './routes/review-history.routes';
import { swaggerOptions } from './config';
import { errorHandler } from './middleware';

const specs = swaggerJsdoc(swaggerOptions);

db.execute('SELECT * FROM users')
  .then((result) => console.log(result))
  .catch((error) => console.log(error));

const app = express();

app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/cards', cardsRoutes);
app.use('/api/notes', notesRoutes);
app.use('/api/relations', relationsRoutes);
app.use('/api/review-history', reviewHistoryRoutes);

// Swagger documentation
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(specs));

app.get('/', (req, res, next) => {
  res.status(200).json({
    status: 'OK',
    message: 'Welcome to spaced learning project',
    documentation: '/api/docs',
    timestamp: new Date().toISOString()
  });
});

app.use(errorHandler);

export default app;
