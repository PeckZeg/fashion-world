const crypto = require('crypto');
const querystring = require('querystring');
const uuid = require('uuid/v4');

const SECRET = 'peckzeg-api-key';

module.exports = (name, password) => {
  let algorithm = querystring.stringify({
    name, password,
    timestamp: new Date().toString(),
    uuid: uuid()
  });

  return crypto.createHmac('sha256', SECRET).update(algorithm).digest('base64');
};
