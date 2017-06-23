const auth = reqlib('./utils/access-keys/account/auth');
const VideoChannel = reqlib('./models/VideoChannel');
const transformQuery = reqlib('./utils/transform-query');
const validateParams = reqlib('./validate-models/admin/video-channel/fetch-list-query-params');
const handleError = reqlib('./utils/response/handle-error');

const ACTION = config.apiActions['admin:video-channel:get:fetch-list'];
const MODEL_QUERY_COND = {
  isRemoved: 'removeAt'
};

module.exports = (req, res, next) => {
  auth(req.header('authorization'), ACTION, false)

    // transform query params
    .then(() => transformQuery(req.query, { isRemoved: Boolean }))

    // validate query params
    .then(validateParams)

    // generate query condition
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

    // query video channel docs
    .then(({ cond, skip, limit, sort }) => (
      VideoChannel.find(cond).skip(skip).limit(limit).sort(sort)
        .then(channels => ({ cond, channels }))
    ))

    // count video channel docs
    .then(({ cond, channels }) => (
      VideoChannel.count(cond).then(total => ({ total, channels }))
    ))

    .then(result => res.send(result))
    .catch(err => handleError(res, err));
};
