const validateParams = reqlib('./validate-models/client/user/login-params');
const createKeys = reqlib('./utils/keys/user/create-keys');
const handleError = reqlib('./utils/response/handle-error');

const User = reqlib('./models/User');

module.exports = (req, res, next) => {
  Promise.resolve(req.body)

    // validate body params
    .then(validateParams)

    // query user doc
    .then(cond => User.findOne(cond).exec())

    // check user exists
    .then(user => {
      if (!user) {
        return Promise.reject(new ResponseError(404, 'user not found'));
      }

      return user;
    })

    // create access keys
    .then(createKeys)

    .then(keys => res.send(keys))
    .catch(err => handleError(res, err));
};
