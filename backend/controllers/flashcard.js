const Flashcard = require('../models/flashcard');
const { getDb } = require('../utils/database');
const collectionName = 'flashcards';

const getFlashcard = function(req, res, next) {
    const db = getDb();
    const id = req.params.id;

    db.collection(collectionName)
        .findOne({
            id
        })
        .then(flashcard => {
            if (flashcard) {
                res.json(flashcard)
            } else {
                res.json({})
            }
        })
        .catch(err => console.log(err));
}

const createFlashcard = function(req, res, next) {
    const newItem = new Flashcard('Sample flashcard', 'What is new?', "I dont know", 'Test');
    newItem.save();
    res.send('Creating a new item');
}

const deleteFlashcard = function(req, res, next) {
    res.send('Deleting an item with specific id');
}

const showFlashcardNotFoundError = function(req, res, next) {
    res.send('Flashcard not found! Please provide a valid flashcard id.');
}

module.exports = {
    getFlashcard,
    createFlashcard,
    deleteFlashcard,
    showFlashcardNotFoundError
}
