const client = reqlib('./redis/client');
const cacheKey = require('./cache-key');
const CaaError = reqlib('./utils/CaaError');
const crypto = require('crypto');

const AUTHORIZATION_REGEXP = /Caa\s+((?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$)/;
const KEYS_REGEXP =  /((?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?):((?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?)\s+(\d{13})/;

module.exports = (authorization, action, required = true) => new Promise((resolve, reject) => {
  Promise.resolve(authorization)
    //  验证 authorization 格式
    .then(authorization => new Promise((resolve, reject) => {
      let auth = AUTHORIZATION_REGEXP.exec(authorization);

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
    .then(({ apiKey, signature, timestamp }) => new Promise((resolve, reject) => {
      let now = moment();
      let startTime = now.clone().add(-5, 'm');
      let endTime = now.clone().add(5, 'm')
      let ts = moment(timestamp);

      if (ts.isBetween(startTime, endTime)) {
        resolve({ apiKey, signature, timestamp });
      }

      else {
        reject(CaaError(400, 'invalid timestamp'));
      }
    }))

    // 验证 api-key
    .then(({ apiKey, signature, timestamp }) => new Promise((resolve, reject) => {
      client.getAsync(cacheKey(apiKey))
        .then(keys => {
          if (!keys) {
            return reject(CaaError(404, 'apiKey not found'));
          }

          resolve({ apiKey, signature, timestamp, keys: JSON.parse(keys) });
        })
        .catch(err => reject(err));
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
        reject(CaaError(400, 'invalid signature'))
      }
    }))

    // 传送 keys
    .then(keys => resolve(keys))

    .catch(err => {
      if (err.message === 'invalid authorization' && required) {
        resolve(null);
      }

      else {
        reject(err);
      }
    });
});
