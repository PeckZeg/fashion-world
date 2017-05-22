const validateParams = reqlib('./validate-models/client/user/reset-password-params');
const cacheKey = reqlib('./utils/cacheKey');
const redisClient = reqlib('./redis/client');
const CaaError = reqlib('./utils/CaaError');
const topClient = reqlib('./utils/topClient');
const User = reqlib('./models/User');
const catchMongooseError = reqlib('./utils/catchMongooseError');

const CODE_RANGE = [100000, 999999];

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

    //  查找用户
    .then(({ mobile, password }) => new Promise((resolve, reject) => {
      User.findOne({ mobile })
        .then(user => {
          if (!user) {
            return reject(CaaError(404, 'user is not exists'));
          }

          resolve({ user, password });
        })
        .catch(err => reject(catchMongooseError(err)));
    }))

    // 更新密码
    .then(({ user, password }) => new Promise((resolve, reject) => {
      user.update({ $set: { password } })
        .then(result => {
          resolve(user);
        })
        .catch(err => reject(catchMongooseError(err)));
    }))

    // 移除验证码缓存
    .then(user => new Promise((resolve, reject) => {
      const key = cacheKey('register.mobile.sent')(user.mobile);

      redisClient.delAsync(key)
        .then(state => resolve(user))
        .catch(err => reject(CaaError(500, err.message)));
    }))

    .then(user => res.send({  }))

    .catch(err => res.status(err.status || 500).send({ message: err.message }));
};
