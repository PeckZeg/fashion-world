const map = require('lodash/map');

const genPaginaiton = require('utils/schema/model/genPaginaiton');
const handleResult = require('utils/response/handleResult');
const handleError = require('utils/response/handle-error');
const authToken = require('utils/token/auth/account');
const genCond = require('utils/schema/model/genCond');
const genSort = require('utils/schema/model/genSort');
const createLog = require('utils/createAccountLog');
const props = require('./props');

const User = require('models/User');

const action = 'ADMIN_USER_GET_FETCH_USER_LIST';

module.exports = async (req, res, next) => {
  try {
    const log = createLog(req, action);
    const token = await authToken(req, action, { log });
    const { limit, skip } = genPaginaiton(req.query);
    const cond = genCond(req.query, props);
    const sort = genSort(req.query, props);
    const total = await User.count(cond);
    const users = map(
      await User.find(cond).limit(limit).skip(skip).sort(sort),
      user => user.toObject()
    );

    handleResult(res, { total, users }, log);
  }

  catch (err) {
    handleError(res, err);
  }
};
