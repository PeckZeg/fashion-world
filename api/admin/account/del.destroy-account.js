const validateObjectId = reqlib('./utils/validate-objectid');
const handleError = reqlib('./utils/response/handle-error');
const authToken = reqlib('./utils/keys/account/auth-token');

const Account = reqlib('./models/Account');

const ACTION = config.apiActions['admin:account:delete:destroy-account'];
const OPTS = { new: true };

module.exports = (req, res, next) => {
  authToken(ACTION, req.header('authorization'))

    // validate `accountId`
    .then(() => validateObjectId(req.params.accountId))

    // update account doc
    .then(accountId => (
      Account.findByIdAndUpdate(accountId, {
        $set: {
          activeAt: null,
          removeAt: new Date()
        }
      }, OPTS)
    ))

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
