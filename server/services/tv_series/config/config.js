const { MongoClient } = require('mongodb');
const url = 'mongodb://mongo:27017';
const dbName = process.env.DATABASE_NAME;
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

let db;

module.exports = {
  connect(callback) {
    client.connect((err) => {
      if (!err) {
        console.log(`connect to db ${dbName} successfully`);
        db = client.db(dbName);
      } else console.log(`connect to db ${dbName} failed`, err);
      callback(err);
    });
  },

  getDatabase() {
    return db;
  },
};
