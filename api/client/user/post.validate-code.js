const redisClient = reqlib('./redis/client');
const cacheKey = reqlib('./utils/cacheKey');
const validateParams = reqlib('./validate-models/client/user/validate-code-params');
const handleError = reqlib('./utils/catchMongooseError');
const caaError = reqlib('./utils/CaaError');

const User = reqlib('./models/User');

module.exports = (req, res, next) => {
  Promise.resolve(req.body)

    // validate body params
    .then(validateParams)

    // validate code
    .then(({ mobile, code }) => new Promise((resolve, reject) => {
      const key = cacheKey('register.mobile.sent')(mobile);

      redisClient.getAsync(key)
        .then(cacheCode => {
          if (!cacheCode) {
            return reject(caaError(404, `code is not sent to mobile ${mobile}`));
          }

          if (cacheCode != code) {
            return reject(caaError(403, 'invalid verify code'));
          }

          resolve();
        })
    }))

    .then(result => res.send(result))
    .catch(err => res.status(err.status || 500).send({ message: err.message }));
};
