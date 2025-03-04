const Flashcard = require('../models/flashcard');
const { getDb } = require('../utils/database');

const getAllFlashcards = function(req, res, next) {
    const db = getDb();
    const collectionName = 'flashcards';

    db.collection(collectionName)
        .find()
        .toArray()
        .then(flashcards => res.json(flashcards))
        .catch(err => console.log(err))
}

const deleteAllFlashcards = function(req, res, next) {
    res.send('Delete all items');
}

module.exports = {
    getAllFlashcards,
    deleteAllFlashcards
}