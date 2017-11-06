const validateObjectId = reqlib('./utils/validate-objectid');
const handleError = reqlib('./utils/response/handle-error');
const injectUsers = reqlib('./utils/model-injector/user');
const authToken = reqlib('./utils/keys/user/auth-token');

const User = reqlib('./models/User');

const ACTION = config.apiActions['client:user:get:fetch-user-profile'];

module.exports = (req, res, next) => {
  authToken(ACTION, req.header('authorization'))

    // validate `userId`
    .then(token => (
      validateObjectId(req.params.userId).then(userId => ({ token, userId }))
    ))

    // query user doc
    .then(({ token, userId }) => (
      User.findById(userId).then(user => (
        injectUsers(token, user.toJSON())
      ))
    ))

    .then(user => res.send({ user }))
    .catch(err => handleError(res, err));
};
