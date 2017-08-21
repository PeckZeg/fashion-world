const setSearchCond = reqlib('./utils/api-model/search-cond');
const handleError = reqlib('./utils/response/handle-error');
const authToken = reqlib('./utils/keys/account/auth-token');
const injectVideos = reqlib('./utils/model-injector/video');
const transformQuery = require('./transformQuery');
const validateQuery = require('./validateQuery');
const setSort = reqlib('./utils/api-model/sort');

const Video = reqlib('./models/Video');

const ACTION = config.apiActions['admin:video:get:fetch-video-list'];
const QUERY_TO_COND_PARAMS = {
  isPublished: 'publishAt',
  isRecommended: 'recommendAt',
  isRemoved: 'removeAt'
};
const SORT_PROPS = ['priority', 'publishAt', 'createAt', 'removeAt'];
const SEARCH_PROPS = ['title'];

module.exports = (req, res, next) => {
  authToken(ACTION, req.header('authorization'))

    // transform query params
    .then(() => transformQuery(req.query))

    // validate query params
    .then(validateQuery)

    // generate query params
    .then(query => {
      const { offset, limit } = query;
      const { channelId, categoryId } = query;
      const skip = offset * limit;
      let cond = {};
      let sort = { createAt: -1 };

      _.forEach({ channelId, categoryId }, (value, key) => {
        if (value !== void 0) {
          cond = {
            ...cond,
            [key]: value
          };
        }
      });

      _.forEach(QUERY_TO_COND_PARAMS, (transKey, key) => {
        if (query[key] !== void 0) {
          cond = {
            ...cond,
            [transKey]: query[key] ? { $ne: null } : null
          };
        }
      });

      sort = setSort(query, sort, SORT_PROPS);
      cond = setSearchCond(query, cond, SEARCH_PROPS);

      return { cond, skip, limit, sort };
    })

    // query video docs
    .then(({ cond, skip, limit, sort }) => (
      Video.find(cond).skip(skip).limit(limit).sort(sort)
        .then(videos => injectVideos(null, videos, 'toObject'))
        .then(videos => ({ cond, videos }))
    ))

    // count video docs
    .then(({ cond, videos }) => (
      Video.count(cond).then(total => ({ total, videos }))
    ))

    .then(result => res.send(result))
    .catch(err => handleError(res, err));
};
