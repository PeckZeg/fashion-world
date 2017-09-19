const debug = require('debug')('auth');
const colors = require('colors/safe');
const crypto = require('crypto');

const createClient = reqlib('./redis/create-client');

const {
  authorization: AUTHORIZATION_REGEXP,
  accessKeys: KEYS_REGEXP
} = config.patterns;

module.exports = (req, actionName, options = {}) => {
  const { required, cacheKey, transform, log, logIdProp } = options;
  const authorization = req.header('authorization');
  const action = config.apiActions[actionName];

  if (!required && !authorization) {
    return Promise.resolve(null);
  }

  return Promise.resolve(authorization)

    // validate `authorization` format
    .then(authorization => {
      const auth = config.patterns.authorization.exec(authorization);

      if (!auth) {
        return Promise.reject(new ResponseError(400, 'invalid authorization'));
      }

      return auth[1];
    })

    // validate token format
    .then(token => {
      token = Buffer.from(token, 'base64').toString();
      token = config.patterns.accessKeys.exec(token);

      if (!token) {
        return Promise.reject('invalid authorization format');
      }

      const apiKey = token[1];
      const signature = token[2];
      const timestamp = +token[3];

      debug(colors.bold.magenta('action-name'), actionName);
      debug(colors.bold.magenta('action'), action);
      debug(colors.bold.magenta('apiKey'), apiKey);
      debug(colors.bold.magenta('signature'), signature);
      debug(
        colors.bold.magenta('timestamp'),
        timestamp,
        colors.italic.gray(`(${moment(timestamp).format()})`)
      );

      return { apiKey, signature, timestamp };
    })

    // validate timestamp
    // .then(args => {
    //   const { apiKey, signature, timestamp } = args;
    //   const now = moment();
    //   const begin = now.clone().add(-10, 'minutes');
    //   const end = now.clone().add(10, 'minutes');
    //   const ts = moment(timestamp);
    //
    //   if (!moment(timestamp).isBetween(begin, end)) {
    //     return Promise.reject(new ResponseError(400, 'invalid timestamp'));
    //   }
    //
    //   return args;
    // })

    // validate `apiKey`
    .then(({ apiKey, signature, timestamp }) => {
      const key = cacheKey(apiKey);
      const client = createClient();

      return client.getAsync(key)
        .then(token => {
          if (!token) {
            return Promise.reject(new ResponseError(404, 'apiKey not found'));
          }

          token = JSON.parse(token);

          if (typeof transform == 'function') {
            token = transform(token);
          }

          return { apiKey, signature, timestamp, token };
        })
        .then(args => client.quitAsync().then(() => args));
    })

    // validate signature
    .then(({ apiKey, signature, timestamp, token }) => {
      const { secretKey } = token;
      const authSignature = crypto.createHash('sha1').update(
        `?action=${action}&apiKey=${apiKey}&secretKey=${secretKey}&timestamp=${timestamp}`
      ).digest('base64');

      debug(colors.bold.magenta('auth signature'), authSignature);

      if (authSignature != signature) {
        return Promise.reject(new ResponseError(400, 'invalid signature'));
      }

      return token;
    })

    // set log
    .then(token => {
      if (log) {
        log[logIdProp] = token[logIdProp];

        // console.log(+new Date() - log.createAt);
      }

      return token;
    });
};
