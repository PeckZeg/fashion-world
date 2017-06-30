const crypto = require('crypto');
const querystring = require('querystring');
const createUUID = require('uuid/v4');

const { apiKey: SECRET } = config.keysCryptoSecrets;

module.exports = accountObject => {
  const account = JSON.stringify(accountObject);
  const timestamp = new Date().toString();
  const uuid = createUUID();
  const algorithm = querystring.stringify({ account, timestamp, uuid });

  return crypto.createHmac('sha256', SECRET).update(algorithm).digest('base64');
};
