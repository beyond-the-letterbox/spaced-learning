const express = require('express');

const flashcardsController = require('../controllers/flashcards')

const router = express.Router();

router.get('/', flashcardsController.getAllFlashcards);

router.delete('/', flashcardsController.deleteAllFlashcards);

module.exports = router;