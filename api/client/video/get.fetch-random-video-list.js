const validateParams = reqlib('./validate-models/client/video/fetch-random-video-list-query-params');
const transformQuery = reqlib('./utils/transform-query');
const handleError = reqlib('./utils/response/handle-error');
const authToken = reqlib('./utils/keys/user/auth-token');
const injectVideos = reqlib('./utils/model-injector/video');

const fetchAvailableCategories = reqlib('./cache/models/available-categories');
const fetchAvailableChannels = reqlib('./cache/models/available-channels');

const Video = reqlib('./models/Video');

const ACTION = config.apiActions['client:video:get:fetch-random-video-list'];
const TRANSFORM_QUERY_PARAMS = { isRecommend: Boolean };
const QUERY_COND_DATE_PARAMS = { isRecommend: 'recommendAt' };

module.exports = (req, res, next) => {
  authToken(ACTION, req.header('authorization'))

    // transform query params
    .then(token => ({
      token,
      query: transformQuery(req.query, TRANSFORM_QUERY_PARAMS)
    }))

    // validate query params
    .then(({ token, query }) => (
      validateParams(req.query).then(query => ({ token, query }))
    ))

    // fetch available channels
    .then(args => (
      fetchAvailableChannels().then(channels => ({ ...args, channels }))
    ))

    // fetch available categories
    .then(args => (
      fetchAvailableCategories().then(categories => ({ ...args, categories }))
    ))

    // generate aggregate params
    .then(({ token, query, channels, categories }) => {
      const { limit, channelId, categoryId } = query;
      let match = {
        channelId: { $in: channels },
        categoryId: { $in: categories },
        publishAt: { $ne: null, $lte: new Date() },
        removeAt: null,
      };

      _.forEach(QUERY_COND_DATE_PARAMS, (transKey, key) => {
        if (query[key] !== void 0) {
          match = {
            ...match,
            [transKey]: query[key] ? { $ne: null, $lte: new Date() } : null
          };
        }
      });

      _.forEach({ channelId, categoryId }, (value, key) => {
        if (value !== void 0) {
          match = {
            ...match,
            [key]: value
          };
        }
      });

      return { token, match, limit };
    })

    // sample video docs
    .then(({ token, match, limit }) => (
      Video.aggregate().match(match).sample(limit)
        .then(videos => videos.map(video => new Video(video)))
        .then(videos => injectVideos(token, videos))
    ))

    // inc video's views
    .then(args => {
      const { videos } = args;
      const videoIds = _.map(videos, '_id');
      const query = { _id: { $in: videoIds } };
      const doc = { $inc: { views: 1 } };
      const opts = { multi: true };

      return Video.update(query, doc, opts).then(videos => args);
    })

    .then(videos => res.send({ videos }))
    .catch(err => handleError(res, err));
};
