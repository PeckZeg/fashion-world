const map = require('lodash/map');

const genPaginaiton = require('utils/schema/model/genPaginaiton');
const handleResult = require('utils/response/handleResult');
const handleError = require('utils/response/handle-error');
const authToken = require('utils/token/auth/account');
const genCond = require('utils/schema/model/genCond');
const genSort = require('utils/schema/model/genSort');
const createLog = require('utils/createAccountLog');
const props = require('./props');

const Account = require('models/Account');

const action = 'ADMIN_ACCOUNT_GET_FETCH_ACCOUNT_LIST';

module.exports = async (req, res, next) => {
  try {
    const log = createLog(req, action);
    const token = await authToken(req, action, { log });
    const { limit, skip } = genPaginaiton(req.query);
    const cond = genCond(req.query, props);
    const sort = genSort(req.query, props);
    let accounts = await Account.find(cond).limit(limit).skip(skip).sort(sort);
    let total = await Account.count(cond);

    accounts = map(accounts, account => account.toObject());

    handleResult(res, { total, accounts }, log);
  }

  catch (err) {
    handleError(res, err);
  }
};
