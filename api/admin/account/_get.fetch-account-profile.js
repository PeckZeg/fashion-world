const validateObjectId = reqlib('./utils/validate-objectid');
const handleError = reqlib('./utils/response/handle-error');
const authToken = reqlib('./utils/keys/account/auth-token');

const Account = reqlib('./models/Account');

const ACTION = config.apiActions['admin:account:get:fetch-account-profile'];

module.exports = (req, res, next) => {
  authToken(ACTION, req.header('authorization'))

    // validate `accountId`
    .then(token => validateObjectId(req.params.accountId))

    // query account doc
    .then(accountId => Account.findById(accountId))

    // ensure account exists
    .then(account => {
      if (!account) {
        return Promise.reject(new ResponseError(404, 'account not found'));
      }

      return account.toObject();
    })

    .then(account => res.send({ account }))
    .catch(err => handleError(res, err));
};
