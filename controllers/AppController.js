#!/usr/bin/env/ node

const dbClient = require('../utils/db.js');
const redistClient = require('../utils/redis');

class AppController {
  // endpoint to check if redis and mongodb are alive
  static async getStatus(req, res) {
    // check if redis and mongodb are a live
    const redisIsAlive = redisClient.isAlive();
    const dbIsAlive = dbClient.isAlive();

    if (redisIsAlive && dbIsAlive) {
      return res.status(200).json({ redis: true, db: true });
    } else {
      // if either is not alive
      return res.status(500).json({ redis: redisIsAlive, db: dbIsAlive })
    }
  }

  // endpoint to retrieve the number of users and files in the db
  static async getStats(req, res) {
    try {
      // get number of users and files from the db
      const numUsers = await dbClient.nbUsers();
      const numFiles = await dbClient.nbFiles();

      return res.status(200).json({ users: numUsers, files: numFiles });
    } catch(error) {
      return res.status(500).json({ error: 'Internal server error' })
    }
  }
}

module.exports = Appcontroller;
