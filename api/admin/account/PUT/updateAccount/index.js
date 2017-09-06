const validateObjectId = reqlib('./utils/validate-objectid');
const handleResult = reqlib('./utils/response/handleResult');
const handleError = reqlib('./utils/response/handle-error');
const authToken = reqlib('./utils/keys/account/auth-token');
const createLog = reqlib('./utils/createAccountLog');
const validateBody = require('./validateBody');

const Account = reqlib('./models/Account');

const ACTION = 'admin:account:put:update-account';

module.exports = (req, res, next) => {
  const log = createLog(req, ACTION);
  const reqAt = +new Date();

  authToken(config.apiActions[ACTION], req.header('authorization'))

    // add `accountId` to log
    .then(token => log.setAccountId(token))

    // validate `accountId`
    .then(token => validateObjectId(req.params.accountId))

    // validate body
    .then(accountId => (
      validateBody(req.body).then(body => ({ accountId, body }))
    ))

    // update account doc
    .then(({ accountId, body }) => (
      Account.findByIdAndUpdate(accountId, { $set: body }, { new: true })
    ))

    // transform account doc
    .then(account => {
      if (!account) {
        return Promise.reject(new ResponseError(404, 'account not found'));
      }

      return account.toObject();
    })

    .then(account => handleResult(res, { account }, log, reqAt))
    .catch(err => handleError(res, err));
};
