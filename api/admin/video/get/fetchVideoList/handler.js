const genPaginaiton = require('utils/schema/model/genPaginaiton');
const handleResult = require('utils/response/handleResult');
const handleError = require('utils/response/handle-error');
const injectVideo = require('utils/models/inject/video');
const authToken = require('utils/token/auth/account');
const genCond = require('utils/schema/model/genCond');
const genSort = require('utils/schema/model/genSort');
const createLog = require('utils/createAccountLog');
const props = require('./props');

const Video = require('models/Video');

const action = 'ADMIN_VIDEO_GET_FETCH_VIDEO_LIST';

module.exports = async function(req, res, next) {
  try {
    const log = createLog(req, action);
    const token = await authToken(req, action, { log });
    const { limit, skip } = genPaginaiton(req.query);
    const cond = genCond(req.query, props);
    const sort = genSort(req.query, props);
    const total = await Video.count(cond);
    const videos = await injectVideo(
      await Video.find(cond).limit(limit).skip(skip).sort(sort),
      { handler: 'toObject' }
    );

    handleResult(res, { total, videos }, log);
  }

  catch (err) {
    handleError(res, err);
  }
};
