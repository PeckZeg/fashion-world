const validateParams = reqlib('./validate-models/client/video/fetch-recommend-video-list');
const injectVideos = reqlib('./utils/models/inject/videos');
const handleError = reqlib('./utils/response/handle-error');
const auth = reqlib('./utils/access-keys/user/auth');

const Video = reqlib('./models/Video');

const fetchAvialableCategoryIds = reqlib('./cache/fetch-available-video-channel-categoryIds');
const fetchAvialableChannelIds = reqlib('./cache/fetch-available-channelIds');

const ACTION = config.apiActions['video:get:fetch-recommend-video-list'];

module.exports = (req, res, next) => {
  auth(req.header('authorization'), ACTION)

    // validate query params
    .then(keys => validateParams(req.query).then(query => ({
      userId: keys ? keys.userId : null,
      query
    })))

    // fetch available channels
    .then(args => (
      fetchAvialableChannelIds().then(channelIds => ({ channelIds, ...args }))
    ))

    // fetch available categoryIds
    .then(args => (
      fetchAvialableCategoryIds().then(categoryIds => ({ categoryIds, ...args }))
    ))

    // generate aggregate params
    .then(({ userId, query, channelIds, categoryIds }) => {
      const { limit, channelId, categoryId } = query;
      let match = {
        recommendAt: { $ne: null, $lte: new Date() },
        publishAt: { $ne: null, $lte: new Date() }
      };

      _.forEach({ channelId, categoryId }, (value, key) => {
        if (value !== void 0) {
          match = { ...match, [key]: value };
        }
      });

      return { userId, match, limit };
    })

    // sample recommend video docs
    .then(({ userId, match, limit }) => (
      Video.aggregate().match(match).sample(limit)
        .then(videos => ({ userId, videos }))
    ))

    // transform original docs to video docs
    .then(({ userId, videos }) => ({
      userId,
      videos: videos.map(video => new Video(video))
    }))

    // inject videos
    .then(({ userId, videos }) => injectVideos(videos, userId))

    .then(videos => res.send({ videos }))
    .catch(err => res.status(err.status || 500).send({ message: err.message }));
};
