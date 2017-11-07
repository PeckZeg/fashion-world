const handleResult = reqlib('./utils/response/handleResult');
const handleError = reqlib('./utils/response/handle-error');
const authToken = reqlib('./utils/token/auth/account');
const createLog = reqlib('./utils/createAccountLog');

const validateBody = require('./validateBody');

const Account = reqlib('./models/Account');

const ACTION = 'ADMIN_MY_UPDATE_MY_PROFILE';

module.exports = (req, res, next) => {
  const log = createLog(req, ACTION);

  console.log(req.query);

  authToken(req, ACTION, { log })

    // validate body
    .then(({ accountId }) => (
      validateBody(req.body).then(body => ({ accountId, body }))
    ))

    // update account doc
    .then(({ accountId, body }) => (
      Account.findByIdAndUpdate(accountId, { $set: body }, { new: true })
    ))

    // transform account doc
    .then(account => {
      if (!account) {
        return Promise.reject(
          new ResponseError(404, 'account not found')
        );
      }

      return account.toObject();
    })

    .then(account => handleResult(res, { account }, log))
    .catch(err => handleError(res, err));
};
