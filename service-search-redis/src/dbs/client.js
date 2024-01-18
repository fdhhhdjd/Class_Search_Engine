//* IMPORT
const redisConnection = require('.');

const redisClient = redisConnection.getClient();

module.exports = redisClient;
