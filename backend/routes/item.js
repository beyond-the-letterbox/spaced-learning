const express = require('express');

const router = express.Router();

router.get('/:id', (req, res, next) => {
    res.send('Getting an item with specific id');
})

router.post('/', (req, res, next) => {
    res.send('Creating a new item');
});

router.delete('/:id', (req, res, next) => {
    res.send('Deleting an item with specific id');
});

module.exports = router;
