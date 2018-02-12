const querystring = require('querystring');
const crypto = require('crypto');
const uuid = require('uuid/v4');

const { apiKey: secret } = config.token.secret;

global.gg = v => {
  const hash = require('crypto').createHash('sha1');
  hash.update(v);
  return Buffer.from(hash.digest('binary').substring(0, 16), 'binary');
};

/**
 *  生成 `apiKey`
 *  @param {object} account 账号信息
 *  @returns 生成的 `apiKey`
 */
module.exports = account => {
  const algorithm = querystring.stringify({
    account: JSON.stringify(account),
    timestamp: new Date().toString(),
    uuid: uuid()
  });

  return crypto.createHmac('sha256', secret).update(algorithm).digest('base64');
};
