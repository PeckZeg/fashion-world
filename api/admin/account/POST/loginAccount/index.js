const createKeys = reqlib('./utils/keys/account/create-keys');
const handleResult = reqlib('./utils/response/handleResult');
const handleError = reqlib('./utils/response/handle-error');
const createLog = reqlib('./utils/createAccountLog');
const validateBody = require('./validateBody');

const Account = reqlib('./models/Account');

const ACTION = 'ADMIN_ACCOUNT_POST_LOGIN_ACCOUNT';

module.exports = (req, res) => {
  const log = createLog(req, ACTION);
  const reqAt = +new Date();

  Promise.resolve(req.body)

    // validate body params
    .then(validateBody)

    // query account doc
    .then(({ name, password }) => Account.findOne({
      name,
      password,
      activeAt: { $ne: null }
    }))

    // check account exists
    .then(account => {
      if (!account) {
        return Promise.reject(new ResponseError(400, 'name or password is invalid'));
      }

      return account.toObject();
    })

    // create keys
    .then(createKeys)

    // add `accountId` to log
    .then(token => log.setAccountId(token))

    .then(token => handleResult(res, token, log, reqAt))
    .catch(err => handleError(res, err));
};
