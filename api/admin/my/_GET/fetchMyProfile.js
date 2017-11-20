const handleResult = reqlib('./utils/response/handleResult');
const handleError = reqlib('./utils/response/handle-error');
const authToken = reqlib('./utils/token/auth/account');
const createLog = reqlib('./utils/createAccountLog');

const Account = reqlib('./models/Account');

const ACTION = 'ADMIN_MY_FETCH_MY_PROFILE';

module.exports = (req, res, next) => {
  const log = createLog(req, ACTION);

  authToken(req, ACTION, { log })

    // fetch account doc
    .then(({ accountId }) => Account.findById(accountId))

    // ensure account exists
    .then(account => {
      if (!account) {
        return Promise.reject(new ResponseError(404, 'account not found'));
      }

      return account.toObject();
    })

    .then(account => handleResult(res, { account }, log))
    .catch(err => handleError(res, err));
};
