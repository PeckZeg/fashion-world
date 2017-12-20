const handleResult = require('utils/response/handleResult');
const handleError = require('utils/response/handle-error');
const authToken = require('utils/token/auth/account');
const createLog = require('utils/createAccountLog');

const Account = require('models/Account');

const action = 'ADMIN_MY_FETCH_MY_PROFILE';

module.exports = async (req, res, next) => {
  try {
    const log = createLog(req, action);
    const token = await authToken(req, action, { log });
    const { accountId } = token;
    let account = await Account.findById(accountId);

    if (!account) {
      throw new ResponseError(404, 'account not found');
    }

    account = account.toObject();

    handleResult(res, { account }, log);
  }

  catch (err) {
    handleError(res, err);
  }
};
