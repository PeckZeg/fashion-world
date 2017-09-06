const handleResult = reqlib('./utils/response/handleResult');
const handleError = reqlib('./utils/response/handle-error');
const authToken = reqlib('./utils/keys/account/auth-token');
const createLog = reqlib('./utils/createAccountLog');
const validateBody = require('./validateBody');

const Account = reqlib('./models/Account');

const ACTION = 'ADMIN_ACCOUNT_POST_CREATE_ACCOUNT';

module.exports = (req, res) => {
  const log = createLog(req, ACTION);
  const reqAt = +new Date();

  authToken(config.apiActions[ACTION], req.header('authorization'))

    // add `accountId` to log
    .then(token => log.setAccountId(token))

    // validate body params
    .then(token => validateParams(req.body))

    // generate account doc
    .then(body => new Account(body))

    // save doc
    .then(account => account.save())

    // to object
    .then(account => account.toObject())

    .then(account => handleResult(res, { account }, log, reqAt))
    .catch(err => handleError(res, err));
};
