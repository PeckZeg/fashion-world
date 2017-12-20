const destroyKeys = require('utils/token/account/destroyKeys');
const handleResult = require('utils/response/handleResult');
const handleError = require('utils/response/handle-error');
const authToken = require('utils/token/auth/account');
const createLog = require('utils/createAccountLog');

const Account = require('models/Account');

const action = 'ADMIN_MY_DEL_LOGOUT';

module.exports = async (req, res, next) => {
  try {
    const log = createLog(req, action);
    const token = await authToken(req, action, { log });

    await destroyKeys(token);

    handleResult(res, { message: 'ok' }, log);
  }

  catch (err) {
    handleError(res, err);
  }
};
