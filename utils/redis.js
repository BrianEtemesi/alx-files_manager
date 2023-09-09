#!/usr/bin/env node

// import necessary libraries
const redis = require('redis'); // Redis client library
const { promisify } = require('util'); // nodejs module for promisifying functions

// RedisClient class
class RedisClient {
  // constructor that creates a redis client instance
  constructor() {
    this.client = redis.createClient();

    // Handle Redis client errors
    this.client.on('error', (err) => {
      console.error('Redis failed to connect:', err);
    });
  }

  // check if connection to redis is alive
  isAlive() {
    return this.client.connected;
  }

  // retrieve value from redis based on provided key
  async get(key) {
    const getAsync = promisify(this.client.get).bind(this.client);
    return getAsync(key);
  }

  // store a value in redis with an expiration duration
  async set(key, value, duration) {
    const setAsync = promisify(this.client.setex).bind(this.client);
    return setAsync(key, duration, value);
  }

  // remove key value pair from redis
  async del(key) {
    const delAsync = promisify(this.client.del).bind(this.client);
    return delAsync(key);
  }
}

// create and export instance of Redisclient
const redisClient = new RedisClient();
module.exports = redisClient;
