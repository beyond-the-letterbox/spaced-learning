const getDb = require('../utils/database').getDb;
const collectionName = 'flashcards';

class Flashcard {
    constructor(title, question, answer, category) {
        this.title = title;
        this.question = question;
        this.answer = answer;
        this.category = category;
    }

    save() {
        const db = getDb();

        db.collection(collectionName)
            .insertOne(this)
            .then(result => console.log(result))
            .catch(error => console.log(error))
    }
}

module.exports = Flashcard;