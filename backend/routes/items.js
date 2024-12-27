const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
    res.send('Get all items');
});

router.delete('/', (req, res, next) => {
    res.send('Delete all items');
});

module.exports = router;
    