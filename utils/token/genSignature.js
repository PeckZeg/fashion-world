const crypto = require('crypto');

module.exports = (action, apiKey, secretKey, timestamp) => (
  crypto.createHash('sha1').update(
    `?action=${action}&apiKey=${apiKey}&secretKey=${secretKey}&timestamp=${timestamp}`
  ).digest('base64')
);
