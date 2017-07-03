const validateParams = reqlib('./validate-models/client/user/create-verify-code-params');
const handleError = reqlib('./utils/response/handle-error');
const createClient = reqlib('./redis/create-client');
const topClient = reqlib('./utils/topClient');
const genCode = reqlib('./utils/gen-code');
const cacheKeys = reqlib('./redis/keys');

const User = reqlib('./models/User');

const {
  maxCountPerDay: MAX_COUNT_PER_DAY,
  maxCountPerHour: MAX_COUNT_PER_HOUR,
  perMsgLiveCycle: MESSAGE_LIVE_CYCLE
} = config.alidayu;

const {
  signName: SIGN_NAME,
  templateCode: TEMPLATE_CODE,
  product: PRODUCT
} = config.alidayu.smsNumSend.user.register;

module.exports = (req, res, next) => {
  Promise.resolve(req.body)

    // validate body params
    .then(validateParams)

    // create redis client
    .then(body => ({ ...body, client: createClient() }))

    // check mobile sms has been sent
    .then(args => {
      const { mobile, client } = args;
      const key = cacheKeys('sms:mobile:sent')(mobile);

      return client.existsAsync(key).then(exists => {
        if (exists) {
          return Promise.reject(new ResponseError(403, 'code has been sent'));
        }

        return args;
      });
    })

    // check `mobile` sent this hour
    .then(args => {
      const { mobile, client } = args;
      const key = cacheKeys('sms:mobile:max-per-hour')(mobile);

      return client.getAsync(key).then(count => {
        count = count || 0;
        count = Number.isNaN(+count) ? 0 : +count;

        if (count >= MAX_COUNT_PER_HOUR) {
          return Promise.reject(
            new ResponseError(403, `mobile ${mobile} has reached the max times`)
          );
        }

        return args;
      });
    })

    // check `mobile` sent this day
    .then(args => {
      const { mobile, client } = args;
      const key = cacheKeys('sms:mobile:max-per-day')(mobile);

      return client.getAsync(key).then(count => {
        count = count || 0;
        count = Number.isNaN(+count) ? 0 : +count;

        if (count >= MAX_COUNT_PER_DAY) {
          return Promise.reject(
            new ResponseError(403, `mobile ${mobile} has reached the max times`)
          );
        }

        return args;
      });
    })

    // check user is exists
    .then(args => {
      const { mobile } = args;

      return User.count({ mobile }).then(count => {
        if (process.env.NODE_ENV == 'production' && count) {
          return Promise.reject(
            new ResponseError(403, `mobile ${mobile} is exists`)
          );
        }

        return args;
      });
    })

    // generate code
    .then(args => ({ ...args, code: genCode() }))

    // send sms
    .then(args => new Promise((resolve, reject) => {
      const { mobile, code } = args;

      topClient.execute('alibaba.aliqin.fc.sms.num.send', {
        'extend': '',
        'sms_type': 'normal',
        'sms_free_sign_name': SIGN_NAME,
        'sms_param': JSON.stringify({ code: `${code}`, product: PRODUCT }),
        'rec_num': mobile ,
        'sms_template_code': TEMPLATE_CODE
      }, (err, result) => {
        if (err) {
          return reject(new ResponseError(500, err.message));
        }

        resolve(args);
      });
    }))

    // write `mobile` and `code`
    .then(args => {
      const { mobile, code, client } = args;
      const multi = client.multi();
      const key = cacheKeys('sms:mobile:sent')(mobile);
      const expire = moment.duration(MESSAGE_LIVE_CYCLE);
      const expireIn = +moment().add(+expire);

      multi.set(key, code).expire(key, expire.asSeconds())

      return multi.execAsync().then(() => ({ ...args, expireIn }));
    })

    // increment sms sent this hour
    .then(args => {
      const { mobile, client } = args;
      const key = cacheKeys('sms:mobile:max-per-hour')(mobile);

      return client.existsAsync(key).then(exists => {
        const multi = client.multi();

        multi.incr(key);

        if (!exists) {
          multi.expire(key, moment.duration(1, 'h').asSeconds());
        }

        return multi.execAsync().then(() => args);
      });
    })

    // increment sms sent this day
    .then(args => {
      const { mobile, client } = args;
      const key = cacheKeys('sms:mobile:max-per-day')(mobile);

      return client.existsAsync(key).then(exists => {
        const multi = client.multi();

        multi.incr(key);

        if (!exists) {
          multi.expire(key, moment.duration(1, 'd').asSeconds());
        }

        return multi.execAsync().then(() => args);
      });
    })

    // close redis client
    .then(({ mobile, code, expireIn, client }) => (
      client.quitAsync().then(() => ({ mobile, code, expireIn }))
    ))

    // send result
    .then(({ mobile, code, expireIn }) => {
      let result = { message: 'ok', expireIn };

      if (process.env.NODE_ENV == 'development') {
        result = { ...result, code };
      }

      res.send(result);
    })

    .catch(err => handleError(res, err));
};
