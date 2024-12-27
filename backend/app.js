const express = require('express');
const itemsRoutes = require('./routes/items');
const itemRoutes = require('./routes/item');

const app = express();

app.use('/items', itemsRoutes);

app.use('/item', itemRoutes);

app.get('/', (req, res, next) => {
    res.send('Great to start a new project!');
});

app.listen(3000);
