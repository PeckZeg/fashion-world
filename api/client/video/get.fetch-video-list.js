const Video = reqlib('./models/Video');
const auth = reqlib('./utils/access-keys/user/auth');
const injectVideos = reqlib('./utils/models/inject/videos');
const transformQuery = reqlib('./utils/transform-query');
const validateParams = reqlib('./validate-models/client/video/fetch-list-query-params');
const cacheKey = reqlib('./utils/cacheKey');
const handleError = reqlib('./utils/response/handle-error');

const fetchAvialableChannelIds = reqlib('./cache/fetch-available-channelIds');
const fetchAvialableCategoryIds = reqlib('./cache/fetch-available-video-channel-categoryIds');

const ACTION = config.apiActions['video:get:fetch-video-list'];
const createVideoFavouriteUsersCacheKey = cacheKey('video:favourite-users');
const createUserFavouriteVideosCacheKey = cacheKey('user:favourite-videos');

const TRANSFORM_QUERY_PARAMS = {
  isRecommend: Boolean,
  tags: Array,
  sourceId: Array,
};

module.exports = (req, res, next) => {
  auth(req.header('authorization'), ACTION)

    //  transform query params
    .then(keys => ({
      userId: keys ? keys.userId : null,
      query: transformQuery(req.query, TRANSFORM_QUERY_PARAMS)
    }))

    // validate query params
    .then(({ userId, query }) => (
      validateParams(query).then(query => ({ userId, query }))
    ))

    // fetch available channels
    .then(args => (
      fetchAvialableChannelIds().then(channelIds => ({ channelIds, ...args }))
    ))

    // fetch available categoryIds
    .then(args => (
      fetchAvialableCategoryIds().then(categoryIds => ({ categoryIds, ...args }))
    ))

    // generate query condition
    .then(({ userId, query, categoryIds, channelIds }) => {
      const { offset, limit } = query;
      const { isRecommend } = query;
      const { channelId, categoryId, sourceId } = query;
      const { tags } = query;
      const skip = offset * limit;
      let sort = { publishAt: -1 };
      let cond = {
        channelId: { $in: channelIds },
        categoryId: { $in: categoryIds },
        removeAt: { $eq: null },
        publishAt: { $ne: null, $lte: new Date() }
      };

      if (isRecommend) {
        cond = { ...cond, recommendAt: { $ne: null } };
        sort = { recommendAt: -1, ...sort };
      }

      if (tags.length) {
        cond.$or = cond.$or || [];
        cond.$or.push(...tags.map(tags => ({ tags })));
      }

      if (sourceId.length) {
        cond = { ...cond, sourceId: { $in: sourceId } };
      }

      _.each({ channelId, categoryId }, (value, prop) => {
        if (value !== void 0) {
          cond = { ...cond, [prop]: value };
        }
      });

      return { userId, cond, skip, limit, sort };
    })

    // query video docs
    .then(({ userId, cond, skip, limit, sort }) => (
      Video.find(cond).skip(skip).limit(limit).sort(sort).exec()
        .then(videos => ({ userId, videos }))
    ))

    // inject videos
    .then(({ userId, videos }) => injectVideos(videos, userId))

    .then(videos => res.send({ videos }))
    .catch(err => handleError(res, err));
};
