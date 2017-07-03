const validateParams = reqlib('./validate-models/client/user/reset-password-params');
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

    // quit redis client
    .then(({ mobile, password, client }) => (
      client.quitAsync().then(() => ({ mobile, password }))
    ))

    // fetch user from db
    .then(({ mobile, password }) => (
      User.findOne({ mobile }).then(user => {
        if (!user) {
          return Promise.reject(new ResponseError(404, 'user not found'));
        }

        return { user, password };
      })
    ))

    // update password
    .then(({ user, password }) => (
      user.update({ $set: { password } }).then(() => user)
    ))

    // transform user
    .then(user => user.toJSON())

    .then(user => res.send({ user }))
    .catch(err => handleError(res, err));
};
