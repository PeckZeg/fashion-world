const redis = require('redis');
const client = redis.createClient(config.redis);

module.exports = client;
