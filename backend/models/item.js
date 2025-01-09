const items = [];

const createItem = function(id, title, question, answer, category) {
    return {
        id,
        title,
        question,
        answer,
        category,
        createdAt: new Date(),
        updatedAt: null,
        save: function() {
            items.push(this);
        }
    }
}

module.exports = {
    createItem,
    items
};
