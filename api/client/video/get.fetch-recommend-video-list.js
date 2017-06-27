const validateParams = reqlib('./validate-models/client/video/fetch-recommend-video-list');
const injectVideos = reqlib('./utils/models/inject/videos');
const handleError = reqlib('./utils/response/handle-error');
const transformQuery = reqlib('./utils/transform-query');
const auth = reqlib('./utils/access-keys/user/auth');
const cacheKey = reqlib('./utils/cacheKey');

const Video = reqlib('./models/Video');

const fetchAvialableCategoryIds = reqlib('./cache/fetch-available-video-channel-categoryIds');
const fetchAvialableChannelIds = reqlib('./cache/fetch-available-channelIds');

const createVideoFavouriteUsersCacheKey = cacheKey('video:favourite-users');
const createUserFavouriteVideosCacheKey = cacheKey('user:favourite-videos');

const ACTION = config.apiActions['video:get:fetch-video-list'];

module.exports = (req, res, next) => {
  Promise.resolve(req.query)

    // validate query params
    .then(validateParams)

    // fetch available channels
    .then(query => (
      fetchAvialableChannelIds().then(channelIds => ({ channelIds, query }))
    ))

    // fetch available categoryIds
    .then(args => (
      fetchAvialableCategoryIds().then(categoryIds => ({ categoryIds, ...args }))
    ))

    // generate aggregate params
    .then(({ query, channelIds, categoryIds }) => {
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

      return { match, limit };
    })

    // sample recommend video docs
    .then(({ match, limit }) => Video.aggregate().match(match).sample(limit))

    // transform original docs to video docs
    .then(videos => videos.map(video => new Video(video)))

    // inject videos
    .then(injectVideos)

    .then(result => res.send(result))
    .catch(err => res.status(err.status || 500).send({ message: err.message }));
};
