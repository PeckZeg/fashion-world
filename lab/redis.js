const redis = require('redis');
const bluebird = require('bluebird');
const createApiKey = require('../utils/api-key');
const createSecretKey = require('../utils/secret-key');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const NAME = 'PeckZeg';
const PASSWORD = 'peckzeg65536:?{OX}';

let apiKey = createApiKey(NAME, PASSWORD);
let secretKey = createSecretKey(apiKey);

const client = redis.createClient();

client.setAsync('foo', 123).then(res => {
  return client.getAsync('foo');
}).then(value => {
  console.log(value);
  client.quit();
});
