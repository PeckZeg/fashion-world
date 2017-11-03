const querystring = require('querystring');
const crypto = require('crypto');
const uuid = require('uuid/v4');

const { secretKey: secret } = config.token.secret;

/**
 *  生成 `secretKey`
 *  @param {string} apiKey
 *  @returns 生成的 secretKey
 */
module.exports = apiKey => {
  const algorithm = querystring.stringify({
    apiKey,
    timestamp: new Date().toString(),
    uuid: uuid()
  });

  return crypto.createHmac('sha256', secret).update(algorithm).digest('base64');
};
