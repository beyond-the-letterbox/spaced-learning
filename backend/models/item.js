const getDb = require('../utils/database').getDb;

class Item {
    constructor(title, question, answer, category) {
        this.title = title;
        this.question = question;
        this.answer = answer;
        this.category = category;
    }

    save() {
        const db = getDb();

        db.collection('items')
            .insertOne(this)
            .then(result => console.log(result))
            .catch(error => console.log(error))
    }

    deleteAll() {
        const db = getDb();

        db.collection('items').deleteMany({});
    }
}

module.exports = Item;