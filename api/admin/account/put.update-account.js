const validateParams = reqlib('./validate-models/admin/account/update-account-body-params');
const validateObjectId = reqlib('./utils/validate-objectid');
const handleError = reqlib('./utils/response/handle-error');
const authToken = reqlib('./utils/keys/account/auth-token');

const Account = reqlib('./models/Account');

const ACTION = config.apiActions['admin:account:put:update-account'];
const OPTS = { new: true };

module.exports = (req, res, next) => {
  authToken(ACTION, req.header('authorization'))

    // validate `accountId`
    .then(token => validateObjectId(req.params.accountId))

    // validate body params
    .then(accountId => (
      validateParams(req.body).then(body => ({ accountId, body }))
    ))

    // update account
    .then(({ accountId, body }) => (
      Account.findByIdAndUpdate(accountId, { $set: body }, OPTS)
    ))

    // transform account doc
    .then(account => {
      if (!account) {
        return Promise.reject(new ResponseError(404, 'account not found'));
      }

      return account.toObject();
    })

    .then(account => res.send({ account }))
    .catch(err => handleError(res, err));
};
