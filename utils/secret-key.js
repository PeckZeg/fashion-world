const crypto = require('crypto');
const querystring = require('querystring');
const uuid = require('uuid/v4');

const SECRET = 'peckzeg-secret-key';

module.exports = apiKey => {
  let algorithm = querystring.stringify({
    apiKey,
    timestamp: new Date().toString(),
    uuid: uuid()
  });

  return crypto.createHmac('sha256', SECRET).update(algorithm).digest('base64');
};
