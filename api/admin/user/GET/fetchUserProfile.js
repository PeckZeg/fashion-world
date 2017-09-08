const validateObjectId = reqlib('./utils/validate-objectid');
const handleResult = reqlib('./utils/response/handleResult');
const handleError = reqlib('./utils/response/handle-error');
const authToken = reqlib('./utils/keys/account/auth-token');
const createLog = reqlib('./utils/createAccountLog');

const User = reqlib('./models/User');
const ACTION = 'ADMIN_USER_GET_FETCH_USER_PROFILE';

module.exports = (req, res, next) => {
  const log = createLog(req, ACTION);
  const reqAt = +new Date();

  authToken(config.apiActions[ACTION], req.header('authorization'))

    // add `accountId` to log
    .then(token => log.setAccountId(token))

    // validate `userId`
    .then(token => validateObjectId(req.params.userId))

    // query user doc
    .then(userId => User.findById(userId))

    // ensure user exists
    .then(user => {
      if (!user) {
        return Promise.reject(new ResponseError(404, 'user not found'));
      }

      return user.toObject();
    })

    .then(user => handleResult(res, { user }, log, reqAt))
    .catch(err => handleError(res, err));
};
