const validateParams = reqlib('./validate-models/client/video/fetch-video-list-query-params');
const transformQuery = reqlib('./utils/transform-query');
const handleError = reqlib('./utils/response/handle-error');
const authToken = reqlib('./utils/keys/user/auth-token');
const injectVideos = reqlib('./utils/model-injector/video');

const fetchAvailableCategories = reqlib('./cache/models/available-categories');
const fetchAvailableChannels = reqlib('./cache/models/available-channels');

const Video = reqlib('./models/Video');

const ACTION = config.apiActions['client:video:get:fetch-video-list'];
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
      validateParams(query).then(query => ({ token, query }))
    ))

    // fetch available channels
    .then(args => (
      fetchAvailableChannels()
        .then(availableChannels => ({ ...args, availableChannels }))
    ))

    // fetch available categories
    .then(args => (
      fetchAvailableCategories()
        .then(availableCategories => ({ ...args, availableCategories }))
    ))

    // generate query params
    .then(({ token, query, availableChannels, availableCategories }) => {
      const { offset, limit } = query;
      const { channelId, categoryId } = query;
      const skip = offset * limit;
      let cond = {
        channelId: { $in: availableChannels },
        categoryId: { $in: availableCategories },
        removeAt: null,
        publishAt: { $ne: null, $lte: new Date() }
      };
      let sort = { createAt: -1 };

      _.forEach(QUERY_COND_DATE_PARAMS, (transKey, key) => {
        if (query[key] !== void 0) {
          cond = {
            ...cond,
            [transKey]: query[key] ? { $ne: null, $lte: new Date() } : null
          };
        }
      });

      _.forEach({ channelId, categoryId }, (value, key) => {
        if (value !== void 0) {
          cond = {
            ...cond,
            [key]: value
          };
        }
      });

      return { token, cond, skip, limit, sort };
    })

    // query video docs
    .then(({ token, cond, skip, limit, sort }) => (
      Video.find(cond).skip(skip).limit(limit).sort(sort)
        .then(videos => ({ token, cond, videos }))
    ))

    // inject videos
    .then(({ token, cond, videos }) => (
      injectVideos(token, videos)
        .then(videos => ({ cond, videos }))
    ))

    // count videos docs
    .then(({ cond, videos }) => (
      Video.count(cond).then(total => ({ total, videos }))
    ))

    .then(result => res.send(result))
    .catch(err => handleError(res, err));
};
