const crypto = require('crypto');

const createClient = reqlib('./redis/create-client');
const debug = require('debug');

const {
  authorization: AUTHORIZATION_REGEXP,
  accessKeys: KEYS_REGEXP
} = config.regexgs;

module.exports = (action, authorization, options) = {
  const { required, cacheKey } = options;

  if (!required && !authorization) {
    return Promise.resolve(null);
  }

  return Promise.resolve(authorization)

    // validate `authorization` format
    .then(authorization => {
      const auth = AUTHORIZATION_REGEXP.exec(authorization);

      debug({ authorization });

      if (!auth) {
        return Promise.reject(new ResponseError(400, 'invalid authorization'));
      }

      return auth[1];
    })

    // validate keys format
    .then(keys => {
      keys = Buffer.from(keys, 'base64').toString();
      keys = KEYS_REGEXP.exec(keys);

      if (!keys) {
        return Promise.reject(new ResponseError(400, 'invalid apiKey'));
      }

      const apiKey = keys[1];
      const signature = keys[2];
      const timestamp = +keys[3];

      debug({ apiKey, signature, timestamp });

      return { apiKey, signature, timestamp };
    })

    // validate timestamp
    .then(({ apiKey, signature, timestamp }) => {
      const now = moment();
      const begin = now.clone().add(-10, 'minutes');
      const end = now.clone().add(10, 'minutes');
      const ts = moment(timestamp);

      if (!moment(timestamp).isBetween(begin, end)) {
        return Promise.reject(new ResponseError(400, 'invalid timestamp'));
      }

      return { apiKey, signature, timestamp };
    })

    // validate apiKey
    .then(({ apiKey, signature, timestamp }) => {
      const key = cacheKey(apiKey);
      const client = createClient();

      debug({ key });

      return client.getAsync(key)
        .then(keys => {
          if (!keys) {
            return Promise.reject(new ResponseError(404, 'apiKey not found'));
          }

          keys = JSON.parse(keys);

          debug({ keys });

          return { apiKey, signature, timestamp, keys };
        });
    })

    // validate signature
    .then(({ apiKey, signature, timestamp, keys }) => {
      const { secretKey } = keys;
      const _signature = crypto.createHash('sha1').update(
        `?action=${action}&apiKey=${apiKey}&secretKey=${secretKey}&timestamp=${timestamp}`
      ).digest('base64');

      if (_signature !== signature) {
        return Promise.reject(new ResponseError(400, 'invalid signature'));
      }

      debug({ _signature, signature });

      return keys;
    });
};
