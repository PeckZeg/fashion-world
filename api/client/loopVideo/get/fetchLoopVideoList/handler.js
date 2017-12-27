const assign = require('lodash/assign');
const keyBy = require('lodash/keyBy');
const map = require('lodash/map');

const genPaginaiton = require('utils/schema/model/genPaginaiton');
const fetchPublishedVideos = require('cache/publishedVideos');
const incVideoViews = require('utils/models/video/incViews');
const handleError = require('utils/response/handle-error');
const injectVideo = require('utils/models/inject/video');
const genCond = require('utils/schema/model/genCond');
const genSort = require('utils/schema/model/genSort');
const authToken = require('utils/token/auth/user');

const LoopVideo = require('models/LoopVideo');
const Video = require('models/Video');

const action = 'LOOP_VIDEO_GET_FETCH_LOOP_VIDEO_LIST';
const props = require('./props');

module.exports = async function(req, res, next) {
  try {
    const token = await authToken(req, action, { required: false });
    const { limit, skip } = genPaginaiton(req.query);
    const cond = {
      ...genCond(req.query, props),
      videoId: { $in: await fetchPublishedVideos() },
      publishAt: { $ne: null, $lte: new Date() },
      removeAt: null
    };
    const sort = { priority: -1, publishAt: -1, createAt: -1 };
    const total = await LoopVideo.count(cond);
    let loopVideos = await LoopVideo.find(cond).skip(skip).limit(limit).sort(sort);
    const videos = keyBy(
      await injectVideo(
        await Video.find({ _id: map(loopVideos, 'videoId') }),
        { token }
      ),
      '_id'
    );

    loopVideos = map(loopVideos, loopVideo => (
      assign(videos[loopVideo.videoId], loopVideo.toJSON())
    ));

    res.send({ total, loopVideos });
  }

  catch (err) {
    handleError(res, err);
  }
};
