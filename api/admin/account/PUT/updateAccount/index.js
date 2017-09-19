const validateObjectId = reqlib('./utils/validate-objectid');
const handleResult = reqlib('./utils/response/handleResult');
const handleError = reqlib('./utils/response/handle-error');
const authToken = reqlib('./utils/token/auth/account');
const createLog = reqlib('./utils/createAccountLog');
const validateBody = require('./validateBody');

const Account = reqlib('./models/Account');

const action = 'ADMIN_ACCOUNT_PUT_UPDATE_ACCOUNT';

module.exports = (req, res, next) => {
  const log = createLog(req, action);

  authToken(req, action, { log })

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

    .then(account => handleResult(res, { account }, log))
    .catch(err => handleError(res, err));
};
