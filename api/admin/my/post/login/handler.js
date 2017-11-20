const handleResult = require('utils/response/handleResult');
const handleError = require('utils/response/handle-error');
const genKeys = require('utils/token/account/genKeys');
const createLog = require('utils/createAccountLog');

const Account = require('models/Account');

const action = 'ADMIN_MY_POST_LOGIN';

module.exports = async (req, res, next) => {
  try {
    const { name, password } = req.body;
    const log = createLog(req, action);
    let account = await Account.findOne({
      name,
      password,
      activeAt: { $ne: null }
    });

    if (!account) {
      throw new ResponseError(400, 'invalid name or password');
    }

    const token = await genKeys(account.toObject());

    log.setAccountId(token);

    handleResult(res, token, log);
  }

  catch (err) {
    handleError(res, err);
  }
};
