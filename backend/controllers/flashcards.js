const Flashcard = require('../models/flashcard');

const getAllFlashcards = function(req, res, next) {
    res.send('Get all items');
}

const deleteAllFlashcards = function(req, res, next) {
    res.send('Delete all items');
}

module.exports = {
    getAllFlashcards,
    deleteAllFlashcards
}