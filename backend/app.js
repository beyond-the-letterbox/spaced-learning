const express = require('express');
const mongoDbConnect = require('./utils/database');


const itemsRoutes = require('./routes/items');
const itemRoutes = require('./routes/item');

const app = express();

app.use('/item', itemRoutes);

app.use('/items', itemsRoutes);

app.get('/', (req, res, next) => {
    res.send('Great to start a new project!');
});

mongoDbConnect(() => {
  app.listen(3000);
});
