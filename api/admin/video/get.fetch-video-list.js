const auth = reqlib('./utils/access-keys/account/auth');
const Video = reqlib('./models/Video');
const transformQuery = reqlib('./utils/transform-query');
const validateParams = reqlib('./validate-models/admin/video/fetch-list-params');
const injectVideos = reqlib('./utils/models/inject/videos');
const handleError = reqlib('./utils/response/handle-error');

const ACTION = config.apiActions['admin:video:get:fetch-list'];
const MODEL_QUERY_COND = {
  isRecommend: 'recommendAt',
  isPublish: 'publishAt',
  isRemoved: 'removeAt'
};

module.exports = (req, res, next) => {
  auth(req.header('authorization'), ACTION, false)

    // transform query params
    .then(() => transformQuery(req.query, {
      isPublish: Boolean,
      isRecommend: Boolean,
      isRemoved: Boolean
    }))

    // validate query params
    .then(validateParams)

    // generate query options
    .then(query => {
      const { offset, limit } = query;
      const skip = offset * limit;
      const cond = _.reduce(MODEL_QUERY_COND, (cond, transKey, key) => {
        if (query[key] !== void 0) {
          cond = {
            ...cond,
            [transKey]: query[key] ? { $ne: null } : { $eq: null }
          };
        }

        return cond;
      }, {});
      const sort = { createAt: -1 };

      return { cond, skip, limit, sort };
    })

    // query video docs
    .then(({ cond, skip, limit, sort }) => (
      Video.find(cond).skip(skip).limit(limit).sort(sort)
            .then(videos => ({ cond, videos }))
    ))

    // count video docs
    .then(({ cond, videos }) => (
      Video.count(cond).then(total => ({ total, videos }))
    ))

    // transform video docs
    .then(({ total, videos }) => (
      injectVideos(videos).then(videos => ({ total, videos }))
    ))

    .then(result => res.send(result))
    .catch(err => handleError(err));
};
