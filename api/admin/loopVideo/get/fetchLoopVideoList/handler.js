const assign = require('lodash/assign');
const keyBy = require('lodash/keyBy');
const map = require('lodash/map');

const genPaginaiton = require('utils/schema/model/genPaginaiton');
const handleResult = require('utils/response/handleResult');
const handleError = require('utils/response/handle-error');
const injectVideo = require('utils/models/inject/video');
const authToken = require('utils/token/auth/account');
const genCond = require('utils/schema/model/genCond');
const genSort = require('utils/schema/model/genSort');
const createLog = require('utils/createAccountLog');
const props = require('./props');

const LoopVideo = require('models/LoopVideo');
const Video = require('models/Video');

const action = 'ADMIN_LOOP_VIDEO_GET_FETCH_LOOP_VIDEO_LIST';

module.exports = async function(req, res, next) {
  try {
    const log = createLog(req, action);
    const token = await authToken(req, action, { log });
    const { limit, skip } = genPaginaiton(req.query);
    const cond = genCond(req.query, props);
    const sort = genSort(req.query, props);
    const total = await Video.count(cond);
    let loopVideos = await LoopVideo.find(cond).limit(limit).skip(skip).sort(sort);
    const videos = keyBy(
      await injectVideo(
        await Video.find({ _id: map(loopVideos, 'videoId') }),
        { handler: 'toObject' }
      ),
      '_id'
    );

    loopVideos = map(loopVideos, loopVideo => assign(
      loopVideo.toObject(),
      { video: videos[loopVideo.videoId] }
    ));

    handleResult(res, { total, loopVideos }, log);
  }

  catch (err) {
    handleError(res, err);
  }
};
