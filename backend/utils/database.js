const mongoDb = require('mongodb');
const MongoClient = mongoDb.MongoClient;
const mongoDbPassword = 'euHMzy80BgxFujZk';

let _db;

exports.connectMongoDb = (callback) => {
    MongoClient
        .connect(`mongodb+srv://klaudia:${mongoDbPassword}@cluster0.2pz2f.mongodb.net/items?retryWrites=true&w=majority&appName=Cluster0`)
        .then((client) => {
            console.log('Successfully connected to database!');
            _db = client.db();
            callback();
        })
        .catch(error => {
            console.log(`Error connecting to database: ${error}`);
            throw error;
        });
};

exports.getDb = () => {
    if (_db) {
        return _db;
    }
};

