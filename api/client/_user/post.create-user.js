const validateParams = reqlib('./validate-models/client/user/create-params');
const handleError = reqlib('./utils/response/handle-error');
const cacheKey = reqlib('./redis/keys')('sms:mobile:sent');
const createClient = reqlib('./redis/create-client');

const User = reqlib('./models/User');

module.exports = (req, res, next) => {
  Promise.resolve(req.body)

    // validate body params
    .then(validateParams)

    // create redis client
    .then(body => ({ ...body, client: createClient() }))

    // validate code
    .then(({ mobile, password, code, client }) => {
      const key = cacheKey(mobile);

      return client.getAsync(key).then(cacheCode => {
        if (!cacheCode) {
          return Promise.reject(
            new ResponseError(404, `code is not sent to mobile`)
          );
        }

        if (cacheCode !== code) {
          return Promise.reject(new ResponseError(403, 'invalid code'));
        }

        return { mobile, password, client };
      });
    })

    // close redis client
    .then(({ mobile, password, client }) => (
      client.quitAsync().then(() => ({ mobile, password }))
    ))

    // check user exists
    .then(({ mobile, password }) => (
      User.count({ mobile }).then(count => {
        if (count) {
          return Promise.reject(new ResponseError(403, 'user is exists'));
        }

        return { mobile, password };
      })
    ))

    // create user
    .then(({ mobile, password }) => {
      const name = `用户${mobile.slice(-4)}`;
      const user = new User({ mobile, password, name });

      return user.save();
    })

    // transform user
    .then(user => user.toJSON())

    .then(user => res.send({ user }))
    .catch(err => handleError(res, err));
};
