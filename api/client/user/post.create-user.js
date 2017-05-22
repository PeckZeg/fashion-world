const validateParams = reqlib('./validate-models/client/user/create-params');
const redisClient = reqlib('./redis/client');
const cacheKey = reqlib('./utils/cacheKey');
const CaaError = reqlib('./utils/CaaError');
const User = reqlib('./models/User');
const catchMongooseError = reqlib('./utils/catchMongooseError');

module.exports = (req, res, next) => {
  Promise.resolve(req.body)

    // 验证参数
    .then(validateParams)

    // 验证验证码
    .then(({ mobile, password, code }) => new Promise((resolve, reject) => {
      const key = cacheKey('register.mobile.sent')(mobile);

      redisClient.getAsync(key)
        .then(cacheCode => {
          if (!cacheCode) {
            return reject(CaaError(403, `code is not sent to mobile ${mobile}`));
          }

          if (cacheCode != code) {
            return reject(CaaError(403, 'invalid verify code'));
          }

          resolve({ mobile, password });
        })
        .catch(err => reject(CaaError(500, err.message)));
    }))

    // 查找用户是否存在
    .then(({ mobile, password }) => new Promise((resolve, reject) => {
      User.count({ mobile })
        .then(count => {
          if (count) return reject(CaaError(403, 'user is exists'));

          resolve({ mobile, password });
        })
        .catch(err => reject(catchMongooseError(err)));
    }))

    //  建立新用户
    .then(({ mobile, password }) => new Promise((resolve, reject) => {
      let user = new User({ mobile, password });
      user.save()
        .then(user => resolve(user))
        .catch(err => reject(catchMongooseError(err)));
    }))

    // 移除 code
    .then(user => new Promise((resolve, reject) => {
      const key = cacheKey('register.mobile.sent')(user.mobile);

      redisClient.delAsync(key)
        .then(state => resolve(user))
        .catch(err => reject(CaaError(500, err.message)));
    }))

    .then(user => res.send({ user }))

    .catch(err => res.status(err.status || 500).send({ message: err.message }));
};
