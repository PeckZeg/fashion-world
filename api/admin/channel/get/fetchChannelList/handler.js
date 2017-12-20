const map = require('lodash/map');

const genPaginaiton = require('utils/schema/model/genPaginaiton');
const handleResult = require('utils/response/handleResult');
const handleError = require('utils/response/handle-error');
const authToken = require('utils/token/auth/account');
const genCond = require('utils/schema/model/genCond');
const genSort = require('utils/schema/model/genSort');
const createLog = require('utils/createAccountLog');
const props = require('./props');

const Channel = require('models/Channel');

const action = 'ADMIN_CHANNEL_GET_FETCH_CHANNEL_LIST';

module.exports = async (req, res, next) => {
  try {
    const log = createLog(req, action);
    const token = await authToken(req, action, { log });
    const { limit, skip } = genPaginaiton(req.query);
    const cond = genCond(req.query, props);
    const sort = genSort(req.query, props);
    let channels = await Channel.find(cond).limit(limit).skip(skip).sort(sort);
    let total = await Channel.count(cond);

    channels = map(channels, account => account.toObject());

    handleResult(res, { total, channels }, log);
  }

  catch (err) {
    handleError(res, err);
  }
};
