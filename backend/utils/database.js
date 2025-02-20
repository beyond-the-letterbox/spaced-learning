const mongoDb = require('mongodb');
const MongoClient = mongoDb.MongoClient;
const mongoDbPassword = 'euHMzy80BgxFujZk';

const connectMongoDb = (callback) => {
    MongoClient
        .connect(`mongodb+srv://klaudia:${mongoDbPassword}@cluster0.2pz2f.mongodb.net/items?retryWrites=true&w=majority&appName=Cluster0`)
        .then(() => {
            console.log('Successfully connected to database!');
            callback();
        })
        .catch(error => {
            console.log(`Error connecting to database: ${error}`);
            throw error;
        });
};

module.exports = connectMongoDb;
