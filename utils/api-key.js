/***
 *  该方法已弃用，请使用以下方法替换
 *    const apiKey = reqlib('./utils/keys/api-key');
 */

const crypto = require('crypto');
const querystring = require('querystring');
const uuid = require('uuid/v4');

const SECRET = 'peckzeg-api-key';

module.exports = (account) => {
  let algorithm = querystring.stringify({
    account: JSON.stringify(account),
    timestamp: new Date().toString(),
    uuid: uuid()
  });

  return crypto.createHmac('sha256', SECRET).update(algorithm).digest('base64');
};
