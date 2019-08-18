const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
import { config } from '../config/config';

// Create a new MongoClient
const client = new MongoClient(config.mongodb.url, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

export const MongoDB  = {
  db: {},
  connect: () => {
    // Use connect method to connect to the Server
    client.connect((err) => {
      console.log('Mongodb Database Connected');
      assert.equal(null, err);
      MongoDB.db = client.db(config.mongodb.dbName);
      client.close();
    });
  }
}