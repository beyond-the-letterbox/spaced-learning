import express from 'express';
import db from './src/utils/database.utils';
import bodyParser from 'body-parser';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

// Routes
import authRoutes from './src/routes/auth.routes';
import cardsRoutes from './src/routes/cards.routes';
import notesRoutes from './src/routes/notes.routes';
import relationsRoutes from './src/routes/relations.routes';
import reviewHistoryRoutes from './src/routes/review-history.routes';
import {swaggerOptions} from "./src/config";

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
    timestamp: new Date().toISOString(),
  });
});

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API Documentation available at http://localhost:${PORT}/api-docs`);
});
