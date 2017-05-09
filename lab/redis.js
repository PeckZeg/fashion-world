const redis = require('redis');
const bluebird = require('bluebird');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const USER_ID = 65536;
const NAME = 'PeckZeg';
const PASSWORD = 'peckzeg65536:?{OX}';

const apiKey = 'yO392M07ar/miLtJd5FUOqxC/WJfjhZbyZxvcOvsVyo=';
const secretKey = 'ocNL66k2u6D6e82EXZA1+l+SLjeE+NkJwG1G051H0Ac=';

const hexString = str => new Buffer(String(str)).toString('hex');

const client = redis.createClient();

// client.setAsync(`userApiKey:${apiKey}`, USER_ID).then(res => {
//   return client.getAsync(`user-api-key:${apiKey}`);
// }).then(userId => {
//   console.log(userId);
//   client.quit();
// });

// client.hmset(`userApiKey:${apiKey}`, { apiKey, secretKey }).then(res => {
//   console.log(res);
// });

let keyByUserId = `user-id-api-key:${hexString(USER_ID)}`;
let keyByApiKey = `user-api-key:${hexString(apiKey)}`;

// client.hmset(keyByUserId, { apiKey, secretKey }, res => {
//   console.log(res);
// });

// client.hmsetAsync(keyByUserId, { apiKey, secretKey, userId: USER_ID }).then(res => {
//   return client.hgetallAsync(keyByUserId);
// }).then(values => {
//   console.log(values);
// });


client.multi()
  .set(keyByUserId, apiKey)
  .hmset(keyByApiKey, { apiKey, secretKey, userId: USER_ID })
  .execAsync()
  .then(() => client.getAsync(keyByUserId))
  .then(apiKey => {
    console.log(keyByUserId, { apiKey });
    return client.hgetallAsync(keyByApiKey);
  })
  .then(result => {
    console.log(keyByApiKey, result);
    client.quit();
  });
