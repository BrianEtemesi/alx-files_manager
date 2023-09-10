#!/usr/bin/env node

// import the MongoDB client library
const { MongoClient } = require('mongodb');

// define the DBClient class
class DBClient {
  constructor() {
    // define default values, or use environment variables if available
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';

    // construct the mongodb uri
    const uri = `mongodb://${host}:${port}/${database}`;

    // create a new MongoDB client instance with connection options
    this.client = new MongoClient(uri, { useUnifiedTopology: true });
    this.client.connect();
  }

  // check if connection to MongoDB is alive
  isAlive() {
    return this.client.isConnected();
  }

  // retrieve the number of documents in the 'users' collection
  async nbUsers() {
    // access the 'users' collection and count its documents
    const collection = this.client.db().collection('users');
    const count = await collection.countDocuments();

    return count;
  }

  // retrieve the number of documents in the 'files' collection
  async nbFiles() {
    // access the 'files' collection and count its documents
    const collection = this.client.db().collection('files');
    const count = await collection.countDocuments();

    return count;
  }
}

// create and export instance of DBClient class
const dbClient = new DBClient();
module.exports = dbClient;
