const redis = require('redis');

module.exports = () => redis.createClient(config.redis);
