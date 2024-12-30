const express = require('express');
const itemController = require('../controllers/item');

const router = express.Router();

router.get('/:id', itemController.getItem);

router.post('/', itemController.createItem);

router.delete('/:id', itemController.deleteItem);

router.get('/', itemController.showItemNotFoundError);

module.exports = router;
