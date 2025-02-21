const express = require('express');

const connectMongoDb = require('./utils/database').connectMongoDb;

const flashcardsRoutes = require('./routes/flashcards');
const flashcardRoutes = require('./routes/flashcard');

const app = express();

app.use('/flashcards', flashcardsRoutes);
app.use('/flashcard', flashcardRoutes);

app.get('/', (req, res, next) => {
    res.send('Welcome to the spaced learning project!');
});

connectMongoDb(() => app.listen(3000));
