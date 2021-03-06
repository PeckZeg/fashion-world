const handleResult = require('utils/response/handleResult');
const handleError = require('utils/response/handleError');
const authToken = require('utils/token/auth/account');
const createLog = require('utils/createAccountLog');

const Account = require('models/Account');

const action = 'ADMIN_MY_UPDATE_MY_PROFILE';

module.exports = async (req, res, next) => {
  try {
    const log = createLog(req, action);
    const { accountId } = await authToken(req, action, { log });

    // update account
    const doc = { $set: req.body };
    const opts = { new: true }
    let account = await Account.findByIdAndUpdate(accountId, doc, opts);

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
