const client = reqlib('./redis/client');
const CaaError = reqlib('./utils/CaaError');
const crypto = require('crypto');
const debug = require('debug')('auth');

const AUTHORIZATION_REGEXP = config.regexgs.authorization;
const KEYS_REGEXP = config.regexgs.accessKeys;

module.exports = (authorization, action, optional = true, cacheKey) => new Promise((resolve, reject) => {
  Promise.resolve(authorization)
    //  验证 authorization 格式
    .then(authorization => new Promise((resolve, reject) => {
      let auth = AUTHORIZATION_REGEXP.exec(authorization);

      debug({ authorization });

      if (!auth) return reject(CaaError(400, 'invalid authorization'));

      resolve(auth[1]);
    }))

    //  验证 keys 格式
    .then(keys => new Promise((resolve, reject) => {
      keys = new Buffer(keys, 'base64').toString();
      keys = KEYS_REGEXP.exec(keys);

      if (!keys) return reject(CaaError(400, 'invalid api key'));

      resolve({ apiKey: keys[1], signature: keys[2], timestamp: +keys[3] });
    }))

    // 验证 timestamp
    // .then(({ apiKey, signature, timestamp }) => new Promise((resolve, reject) => {
    //   let now = moment();
    //   let startTime = now.clone().add(-5, 'm');
    //   let endTime = now.clone().add(5, 'm')
    //   let ts = moment(timestamp);
    //
    //   debug({ apiKey, signature, timestamp });
    //
    //   if (ts.isBetween(startTime, endTime)) {
    //     resolve({ apiKey, signature, timestamp });
    //   }
    //
    //   else {
    //     reject(CaaError(400, 'invalid timestamp'));
    //   }
    // }))

    // 验证 api-key
    .then(({ apiKey, signature, timestamp }) => new Promise((resolve, reject) => {
      debug(cacheKey(apiKey))

      client.getAsync(cacheKey(apiKey))
        .then(keys => {
          if (!keys) return reject(CaaError(404, 'apiKey not found'));
          resolve({ apiKey, signature, timestamp, keys: JSON.parse(keys) });
        })
        .catch(reject);
    }))

    // 验证 signature
    .then(({ apiKey, signature, timestamp, keys }) => new Promise((resolve, reject) => {
      let { secretKey } = keys;

      let _signature = crypto.createHash('sha1').update(
        `?action=${action}&apiKey=${apiKey}&secretKey=${secretKey}&timestamp=${timestamp}`
      ).digest('base64');

      if (_signature === signature) {
        resolve(keys);
      }

      else {
        reject(CaaError(400, 'invalid signature'));
      }
    }))

    // 传送 keys
    .then(keys => {
      debug({ keys });
      resolve(keys);
    })

    .catch(err => {
      if (err.message === 'invalid authorization' && optional) {
        resolve(null);
      }

      else {
        reject(err);
      }
    });
});
