const validateObjectId = reqlib('./utils/validate-objectid');
const handleResult = reqlib('./utils/response/handleResult');
const handleError = reqlib('./utils/response/handle-error');
const authToken = reqlib('./utils/keys/account/auth-token');
const createLog = reqlib('./utils/createAccountLog');

const Account = reqlib('./models/Account');

const ACTION = 'ADMIN_ACCOUNT_POST_RECOVER_ACCOUNT';
const OPTS = { new: true };

module.exports = (req, res, next) => {
  const log = createLog(req, ACTION);
  const reqAt = +new Date();

  authToken(config.apiActions[ACTION], req.header('authorization'))

    // add `accountId` to log
    .then(token => log.setAccountId(token))

    // validate `accountId`
    .then(token => validateObjectId(req.params.accountId))

    // query account doc
    .then(accountId => Account.findById(accountId, 'removeAt'))

    // ensure account exists
    .then(account => {
      if (!account) {
        return Promise.reject(new ResponseError(404, 'account not found'));
      }

      if (!account.removeAt) {
        return Promise.reject(new ResponseError(403, 'account has been recovered'));
      }

      const doc = {
        $set: {
          removeAt: null
        }
      };

      return Account.findByIdAndUpdate(account._id, doc, { new: true });
    })

    // transform account doc
    .then(account => account.toObject())

    .then(account => handleResult(res, { account }, log, reqAt))
    .catch(err => handleError(res, err));
};
