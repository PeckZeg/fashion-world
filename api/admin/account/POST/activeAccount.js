const validateObjectId = reqlib('./utils/validate-objectid');
const handleResult = reqlib('./utils/response/handleResult');
const handleError = reqlib('./utils/response/handle-error');
const authToken = reqlib('./utils/token/auth/account');
const createLog = reqlib('./utils/createAccountLog');

const Account = reqlib('./models/Account');

const action = 'ADMIN_ACCOUNT_POST_ACTIVE_ACCOUNT';

module.exports = (req, res, next) => {
  const log = createLog(req, action);

  authToken(req, action, { log })

    // validate `accountId`
    .then(token => validateObjectId(req.params.accountId))

    // query account doc
    .then(accountId => Account.findById(accountId, 'activeAt'))

    // ensure account exists
    .then(account => {
      if (!account) {
        return Promise.reject(new ResponseError(404, 'account not found'));
      }

      if (account.activeAt) {
        return Promise.reject(new ResponseError(403, 'account has been actived'));
      }

      const doc = {
        $set: {
          activeAt: new Date(),
          removeAt: null
        }
      };

      return Account.findByIdAndUpdate(account._id, doc, { new: true });
    })

    // transform account doc
    .then(account => account.toObject())

    .then(account => handleResult(res, { account }, log))
    .catch(err => handleError(res, err));
};
