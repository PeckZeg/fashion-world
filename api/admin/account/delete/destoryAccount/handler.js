const handleResult = require('utils/response/handleResult');
const handleError = require('utils/response/handle-error');
const authToken = require('utils/token/auth/account');
const createLog = require('utils/createAccountLog');

const Account = require('models/Account');

const action = 'ADMIN_ACCOUNT_DEL_DESTROY_ACCOUNT';

module.exports = async (req, res, next) => {
  try {
    const log = createLog(req, action);
    const token = await authToken(req, action, { log });
    const { accountId } = req.params;
    let account = await Account.findById(accountId, 'removed');

    if (!account) {
      throw new ResponseError(404, 'account not found');
    }

    if (account.removed) {
      throw new ResponseError(403, 'account has been removed');
    }

    const doc = { $set: { activeAt: null, removeAt: new Date() } };
    const opts = { new: true };

    account = await Account.findByIdAndUpdate(accountId, doc, opts);
    account = account.toObject();

    handleResult(res, { account }, log);
  }

  catch (err) {
    handleError(res, err);
  }
};
