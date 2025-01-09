const itemModel = require('../models/item');

const getAllItems = function(req, res, next) {
    const items = itemModel.items;
    if (items) {
        console.log('all items length', items.length);
    }
    res.send('Get all items');
}

const deleteAllItems = function(req, res, next) {
    res.send('Delete all items');
}

module.exports = {
    getAllItems,
    deleteAllItems
}