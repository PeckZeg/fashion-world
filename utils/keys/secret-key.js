const crypto = require('crypto');
const querystring = require('querystring');
const createUUID = require('uuid/v4');

const { secretKey: SECRET } = config.keysCryptoSecrets;

module.exports = apiKey => {
  const timestamp = new Date().toString();
  const uuid = createUUID();
  const algorithm = querystring.stringify({ apiKey, timestamp, uuid });

  return crypto.createHmac('sha256', SECRET).update(algorithm).digest('base64');
};
