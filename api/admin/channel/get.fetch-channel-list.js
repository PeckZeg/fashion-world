const validateParams = reqlib('./validate-models/admin/channel/fetch-channel-list-query-params');
const handleError = reqlib('./utils/response/handle-error');
const transformQuery = reqlib('./utils/transform-query');

const Channel = reqlib('./models/Channel');

const TRANSFORM_QUERY_PARAMS = { isPublished: Boolean, isRemoved: Boolean };
const QUERY_TO_COND_PARAMS = { isPublished: 'publishAt', isRemoved: 'removeAt' };

module.exports = (req, res, next) => {
  Promise.resolve(req.query)

    // transform query params
    .then(query => transformQuery(query, TRANSFORM_QUERY_PARAMS))

    // validate query params
    .then(validateParams)

    // generate query params
    .then(query => {
      const { offset, limit } = query;
      const cond = {};
      const skip = offset * limit;
      const sort = { createAt: -1 };

      _.each(QUERY_TO_COND_PARAMS, (transKey, key) => {
        if (query[key] !== void 0) {
          Object.assign(cond, {
            [transKey]: query[key] ? { $ne: null } : null
          });
        }
      });

      return { cond, skip, limit, sort };
    })

    // query channel doc
    .then(({ cond, skip, limit, sort }) => (
      Channel.find(cond).skip(skip).limit(limit).sort(sort)
    ))

    // transform channels
    .then(channels => channels.map(channel => channel.toObject()))

    .then(channels => res.send({ channels }))
    .catch(err => handleError(res, err));
};
