const caaError = reqlib('./utils/CaaError');
const crypto = require('crypto');
const redisClient = reqlib('./redis/client');
const cacheKey = reqlib('./utils/cacheKey');

let router = module.exports = require('express').Router();

router.post('/', (req, res, next) => {
  Promise.resolve(req.body)
    .then(({ apiKey, secretKey, action, timestamp }) => new Promise((resolve, reject) => {
      let signature = crypto.createHash('sha1').update(
        `?action=${action}&apiKey=${apiKey}&secretKey=${secretKey}&timestamp=${timestamp}`
      ).digest('base64');
      let authorization = `${apiKey}:${signature} ${timestamp}`;

      resolve({
        apiKey, secretKey, action, timestamp,
        signature: {
          utf8: `?action=${action}&apiKey=${apiKey}&secretKey=${secretKey}&timestamp=${timestamp}`,
          hex: Buffer.from(signature, 'base64').toString('hex'),
          base64: Buffer.from(signature, 'base64').toString('base64'),
        },
        authorization: {
          utf8: Buffer.from(authorization, 'utf8').toString('utf8'),
          hex: Buffer.from(authorization, 'utf8').toString('hex'),
          base64: Buffer.from(authorization, 'utf8').toString('base64')
        }
      });
    }))
    .then(result => res.send(result))
    .catch(err => res.status(500).send(err.message));
});
