const fetchAvailableVideos = reqlib('./cache/models/available-videos');
const handleError = reqlib('./utils/response/handle-error');
const injectVideos = reqlib('./utils/model-injector/video');
const authToken = reqlib('./utils/keys/user/auth-token');
const validateQuery = require('./validateQuery');

const LoopVideo = reqlib('./models/LoopVideo');
const Video = reqlib('./models/Video');

const ACTION = config.apiActions['client:loop-video:fetch-loop-video-list'];

module.exports = (req, res, next) => {
  authToken(ACTION, req.header('authorization'))

    // validate query params
    .then(token => (
      validateQuery(req.query).then(query => ({ token, query }))
    ))

    // fetch available videos
    .then(args => (
      fetchAvailableVideos()
        .then(availableVideos => ({ ...args, availableVideos }))
    ))

    // gen query params
    .then(({ token, query, availableVideos }) => {
      const { offset, limit } = query;
      const skip = offset * limit;
      let cond = {
        videoId: { $in: availableVideos },
        publishAt: { $ne: null, $lte: new Date() },
        removeAt: null
      };
      let sort = { priority: -1, publishAt: -1, createAt: -1 };

      return { token, cond, skip, limit, sort };
    })

    // query loop video
    .then(({ token, cond, skip, limit, sort }) => (
      LoopVideo.find(cond).skip(skip).limit(limit).sort(sort)
        .then(loopVideos => ({ token, cond, loopVideos }))
    ))

    // count loopVideos
    .then(({ token, cond, loopVideos }) => (
      LoopVideo.count(cond).then(total => ({ token, total, loopVideos }))
    ))

    // pick `videoId`
    .then(({ token, total, loopVideos }) => ({
      token,
      total,
      loopVideos,
      videoIds: _.map(loopVideos, 'videoId')
    }))

    // query video docs
    .then(({ token, total, loopVideos, videoIds }) => (
      Video.find({ _id: { $in: videoIds } })
        .then(videos => injectVideos(token, videos))
        .then(videos => ({
          total,
          loopVideos,
          videosById: _.keyBy(videos, '_id')
        }))
    ))

    // merge video to loop videos
    .then(({ total, loopVideos, videosById }) => ({
      total,
      loopVideos: loopVideos.map(loopVideo => {
        const video = videosById[loopVideo.videoId] || null;
        return Object.assign(loopVideo.toJSON(), { video });
      })
    }))

    .then(result => res.send(result))
    .catch(err => handleError(res, err));
};
