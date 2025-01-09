const express = require('express');
const itemsController = require('../controllers/items')

const router = express.Router();

router.get('/', itemsController.getAllItems);

router.delete('/', itemsController.deleteAllItems);

module.exports = router;