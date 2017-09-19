const handleResult = reqlib('./utils/response/handleResult');
const handleError = reqlib('./utils/response/handle-error');
const authToken = reqlib('./utils/token/auth/account');
const createLog = reqlib('./utils/createAccountLog');
const validateBody = require('./validateBody');

const Account = reqlib('./models/Account');

const action = 'ADMIN_ACCOUNT_POST_CREATE_ACCOUNT';

module.exports = (req, res) => {
  const log = createLog(req, action);

  authToken(req, action, { log })

    // validate body
    .then(token => validateBody(req.body))

    // generate account doc
    .then(body => new Account(body))

    // save doc
    .then(account => account.save())

    // to object
    .then(account => account.toObject())

    .then(account => handleResult(res, { account }, log))
    .catch(err => handleError(res, err));
};
