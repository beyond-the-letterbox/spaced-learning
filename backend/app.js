const express = require('express');
const connectMongoDb = require('./utils/database').connectMongoDb;

const itemsRoutes = require('./routes/items');
const itemRoutes = require('./routes/item');

const app = express();

app.use('/item', itemRoutes);

app.use('/items', itemsRoutes);

app.get('/', (req, res, next) => {
    res.send('Great to start a new project!');
});

connectMongoDb(() => app.listen(3000));
