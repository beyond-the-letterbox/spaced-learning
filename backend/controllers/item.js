const Item = require('../models/item');

const getItem = function(req, res, next) {
    const matchedItem = itemModel.items.find(item => item.id === req.params.id);
    console.log('matchedItem', matchedItem, req.params.id);
    res.send('Getting an item with specific id');
}

const createItem = function(req, res, next) {
    const newItem = new Item('Hahaha', 'What is new item?', "I dont know", 'Stupid questions');
    newItem.save();
    newItem.deleteAll();
  //  res.send('Creating a new item');
}

const deleteItem = function(req, res, next) {
    res.send('Deleting an item with specific id');
}

const showItemNotFoundError = function(req, res, next) {
    console.log('item')
    createItem();
    //res.send('Page not found! Please provide a valid item id.');
}

module.exports = {
    getItem,
    createItem,
    deleteItem,
    showItemNotFoundError
}
