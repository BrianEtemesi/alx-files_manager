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
  }

  // check if connection to MongoDB is alive
  async isAlive() {
    try {
      // attempt to connect to the mongodb server
      await this.client.connect();
      return true;
    } catch (error) {
      // incase of an error, log error and return false
      console.error(error);
      return false;
    } finally {
      // close the mongodb client connection
      this.client.close();
    }
  }

  // retrieve the number of documents in the 'users' collection
  async nbUsers() {
    try {
      // connect to the MongoDB server
      await this.client.connect();

      // access the 'users' collection and count its documents
      const collection = this.client.db().collection('users');
      const count = await collection.countDocuments();

      return count;

    } catch (error) {
      // incase of error log error
      console.error(error);
      return -1;

    } finally {
      // close the mongodb client connection
      this.client.close();
    }
  }

  // retrieve the number of documents in the 'files' collection
  async nbFiles() {
    try {
      // connect to the MongoDB server
      await this.client.connect();

      // access the 'files' collection and count its documents
      const collection = this.client.db().collection('files');
      const count = await collection.countDocuments();

      return count;

    } catch (error) {
      // incase of error log error
      console.error(error);
      return -1;

    } finally {
      // close the mongodb client connection
      this.client.close();
    }
  }
}

// create and export instance of DBClient class
const dbClient = new DBClient();
module.exports = dbClient;

