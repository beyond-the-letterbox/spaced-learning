const express = require('express');
const flashcardController = require('../controllers/flashcard');

const router = express.Router();

router.get('/:id', flashcardController.getFlashcard);

router.post('/', flashcardController.createFlashcard);

router.delete('/:id', flashcardController.deleteFlashcard);

router.get('/', flashcardController.showFlashcardNotFoundError);

module.exports = router;
