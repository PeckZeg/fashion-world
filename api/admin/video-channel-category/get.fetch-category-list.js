const auth = reqlib('./utils/access-keys/account/auth');
const VideoChannelCategory = reqlib('./models/VideoChannelCategory');
const transformQuery = reqlib('./utils/transform-query');
const validateParams = reqlib('./validate-models/admin/video-channel/fetch-list-query-params');
const handleError = reqlib('./utils/response/handle-error');

const ACTION = config.apiActions['admin:video-category:get:fetch-list'];
const TRANSFORM_QUERY_OPTS = { isRemoved: Boolean, isPublished: Boolean };
const MODEL_QUERY_COND = { isRemoved: 'removeAt', isPublished: 'publishAt' };

module.exports = (req, res, next) => {
  auth(req.header('authorization'), ACTION)

    // transform query params
    .then(() => transformQuery(req.query, TRANSFORM_QUERY_OPTS))

    // validate query params
    .then(validateParams)

    // generate query params
    .then(query => {
      const { offset, limit } = query;
      const skip = offset * limit;
      let cond = _.reduce(MODEL_QUERY_COND, (cond, transKey, key) => {
        if (query[key] !== void 0) {
          cond = {
            ...cond,
            [transKey]: query[key] ? { $ne: null } : { $eq: null }
          };
        }

        return cond;
      }, {});
      let sort = { createAt: -1 };

      if (query.isRemoved) {
        sort = { removeAt: -1, ...sort };
      }

      return { cond, skip, limit, sort };
    })

    // query video channel category docs
    .then(({ cond, skip, limit, sort }) => (
      VideoChannelCategory.find(cond).skip(skip).limit(limit).sort(sort)
        .then(categories => ({ cond, categories }))
    ))

    // count video channel category docs
    .then(({ cond, categories }) => (
      VideoChannelCategory.count(cond).then(total => ({ total, categories }))
    ))

    .then(result => res.send(result))
    .catch(err => handleError(res, err));
};
