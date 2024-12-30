const itemModel = require('../models/item');

const getItem = function(req, res, next) {
    const matchedItem = itemModel.items.find(item => item.id === req.params.id);
    console.log('matchedItem', matchedItem, req.params.id);
    res.send('Getting an item with specific id');
}

const createItem = function(req, res, next) {
    const newItem = itemModel.createItem(1, 'new', 'my item', 'my item answer', 'category');
    newItem.save();
    res.send('Creating a new item');
}

const deleteItem = function(req, res, next) {
    res.send('Deleting an item with specific id');
}

const showItemNotFoundError = function(req, res, next) {
    res.send('Page not found! Please provide a valid item id.');
}

module.exports = {
    getItem,
    createItem,
    deleteItem,
    showItemNotFoundError
}
