const genPaginaiton = require('utils/schema/model/genPaginaiton');
const handleResult = require('utils/response/handleResult');
const handleError = require('utils/response/handle-error');
const injectVideo = require('utils/models/inject/video');
const authToken = require('utils/token/auth/account');
const genCond = require('utils/schema/model/genCond');
const genSort = require('utils/schema/model/genSort');
const createLog = require('utils/createAccountLog');
const props = require('./props');

const map = require('lodash/map');

const Version = require('models/Version');

const action = 'ADMIN_VERSION_GET_FETCH_VERSION_LIST';

module.exports = async function(req, res, next) {
  try {
    const log = createLog(req, action);
    const token = await authToken(req, action, { log });
    const { limit, skip } = genPaginaiton(req.query);
    const cond = genCond(req.query, props);
    const sort = genSort(req.query, props);
    const total = await Version.count(cond);
    const versions = map(
      await Version.find(cond).limit(limit).skip(skip).sort(sort),
      version => version.toObject()
    );

    handleResult(res, { total, versions }, log);
  }

  catch (err) {
    handleError(res, err);
  }
};
