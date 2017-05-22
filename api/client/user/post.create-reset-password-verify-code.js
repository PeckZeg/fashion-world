const validateParams = reqlib('./validate-models/client/user/create-reset-password-verify-code-params');
const cacheKey = reqlib('./utils/cacheKey');
const client = reqlib('./redis/client');
const CaaError = reqlib('./utils/CaaError');
const topClient = reqlib('./utils/topClient');
const User = reqlib('./models/User');
const catchMongooseError = reqlib('./utils/catchMongooseError');

const {
  maxCountPerDay: MAX_COUNT_PER_DAY,
  maxCountPerHour: MAX_COUNT_PER_HOUR,
  signName: SIGN_NAME,
  templateCode: TEMPLATE_CODE,
  perMsgLiveCycle: MESSAGE_LIVE_CYCLE
} = config.alidayu.smsNumSend;

const CODE_RANGE = [100000, 999999];

module.exports = (req, res, next) => {
  Promise.resolve(req.body)
    // 验证参数
    .then(validateParams)

    //  检查用户是否已经存在
    .then(({ mobile }) => new Promise((resolve, reject) => {
      User.count({ mobile }).then(count => {
        if (!count) {
          return reject(CaaError(403, `mobile ${mobile} is not exists`));
        }

        resolve({ mobile });
      }).catch(err => {
        err = catchMongooseError(err);
        return err ? reject(err) : resolve({ mobile });
      })
    }))

    // 检查是否达到每日上限
    .then(({ mobile }) => new Promise((resolve, reject) => {
      const key = cacheKey('register.mobile.max-per-day')(mobile);

      client.getAsync(key).then(count => {
        count = count || 0;

        if (count >= MAX_COUNT_PER_DAY) {
          return reject(CaaError(403, `mobile ${mobile} has reached the max number per day`));
        }

        resolve({ mobile });
      }).catch(reject);
    }))

    // 检查是否达到每小时上限
    .then(({ mobile }) => new Promise((resolve, reject) => {
      const key = cacheKey('register.mobile.max-per-hour')(mobile);

      client.getAsync(key).then(count => {
        count = count || 0;

        if (count >= MAX_COUNT_PER_HOUR) {
          return reject(CaaError(403, `mobile ${mobile} has reached the max number per hour`));
        }

        resolve({ mobile });
      }).catch(reject);
    }))

    //  检查是否短信已经发送
    .then(({ mobile }) => new Promise((resolve, reject) => {
      const key = cacheKey('register.mobile.sent')(mobile);

      client.existsAsync(key).then(exists => {
        if (exists) {
          return reject(CaaError(403, 'code has been sent'));
        }

        resolve({ mobile });
      }).catch(reject);
    }))

    // 生成 code
    .then(({ mobile }) => Promise.resolve({
      mobile,
      code: _.random(...CODE_RANGE) + ''
    }))

    // 发送短信
    // .then(({ mobile, code }) => new Promise((resolve, reject) => {
    //   topClient.execute('alibaba.aliqin.fc.sms.num.send', {
    //     'extend': '',
    //     'sms_type': 'normal',
    //     'sms_free_sign_name': SIGN_NAME,
    //     'sms_param': JSON.stringify({ code: `${code}` }),
    //     'rec_num': mobile ,
    //     'sms_template_code': TEMPLATE_CODE
    //   }, (err, res) => {
    //     if (err) {
    //       return reject(CaaError(500, err.message));
    //     }
    //
    //     resolve({ mobile, code });
    //   });
    // }))

    // 记录发送信息
    .then(({ mobile, code }) => new Promise((resolve, reject) => {
      const key = cacheKey('register.mobile.sent')(mobile);
      const expireIn = moment.duration(MESSAGE_LIVE_CYCLE);

      client.multi()
        .set(key, code)
        .expire(key, expireIn.asSeconds())
        .execAsync()
        .then(count => resolve({ mobile, code, expireIn: +moment().add(+expireIn) }))
        .catch(err => reject(CaaError(500, err.message)));
    }))

    // 增加记录本小时数
    .then(({ mobile, code, expireIn }) => new Promise((resolve, reject) => {
      const key = cacheKey('register.mobile.max-per-hour')(mobile);
      const keyExpireIn = moment.duration(1, 'h').asSeconds();

      client.existsAsync(key)
        .then(exists => {
          if (exists) return client.incrAsync(key);
          return client.multi().incr(key).expire(key, keyExpireIn).execAsync();
        })
        .then(() => resolve({ mobile, code, expireIn }))
        .catch(err => reject(CaaError(500, err.message)));
    }))

    // 增加记录本日数
    .then(({ mobile, code, expireIn }) => new Promise((resolve, reject) => {
      const key = cacheKey('register.mobile.max-per-day')(mobile);
      const keyExpireIn = moment.duration(1, 'd').asSeconds();
      let result = { expireIn };

      if (process.env.NODE_ENV !== 'production') {
        Object.assign(result, { code });
      }

      client.existsAsync(key)
        .then(exists => {
          if (exists) return client.incrAsync(key);
          return client.multi().incr(key).expire(key, keyExpireIn).execAsync();
        })
        .then(() => resolve(result))
        .catch(err => reject(CaaError(500, err.message)));
    }))

    .then(result => res.send(result))

    .catch(err => res.status(err.status || 500).send({ message: err.message }));
};
