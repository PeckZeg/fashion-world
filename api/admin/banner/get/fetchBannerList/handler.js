const genPaginaiton = require('utils/schema/model/genPaginaiton');
const handleResult = require('utils/response/handleResult');
const injectBanners = require('utils/models/inject/banner');
const handleError = require('utils/response/handle-error');
const authToken = require('utils/token/auth/account');
const genCond = require('utils/schema/model/genCond');
const genSort = require('utils/schema/model/genSort');
const createLog = require('utils/createAccountLog');
const props = require('./props');

const Banner = require('models/Banner');

const action = 'ADMIN_BANNER_GET_FETCH_BANNER_LIST';

module.exports = async function(req, res, next) {
  try {
    const log = createLog(req, action);
    const token = await authToken(req, action, { log });
    const { limit, skip } = genPaginaiton(req.query);
    const cond = genCond(req.query, props);
    const sort = genSort(req.query, props);
    let total = await Banner.count(cond);
    let banners = await injectBanners(
      await Banner.find(cond).limit(limit).skip(skip).sort(sort),
      { handler: 'toObject' }
    );

    handleResult(res, { total, banners }, log);
  }

  catch (err) {
    handleError(res, err);
  }
};
