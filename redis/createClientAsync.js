const redis = require('redis');

module.exports = () => Promise.resolve(
  redis.createClient(config.redis)
);
