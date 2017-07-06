const validateParams = reqlib('./validate-models/admin/channel/fetch-channel-list-query-params');
const handleError = reqlib('./utils/response/handle-error');
const authToken = reqlib('./utils/keys/account/auth-token');
const transformQuery = reqlib('./utils/transform-query');

const Channel = reqlib('./models/Channel');

const ACTION = config.apiActions['admin:channel:get:fetch-channel-list'];
const TRANSFORM_QUERY_PARAMS = { isPublished: Boolean, isRemoved: Boolean };
const QUERY_TO_COND_PARAMS = { isPublished: 'publishAt', isRemoved: 'removeAt' };
const SORT_PROPS = ['priority', 'publishAt', 'removeAt'];

module.exports = (req, res, next) => {
  authToken(ACTION, req.header('authorization'))

    // transform query params
    .then(() => transformQuery(req.query, TRANSFORM_QUERY_PARAMS))

    // validate query params
    .then(validateParams)

    // generate query params
    .then(query => {
      const { offset, limit } = query;
      const cond = {};
      const skip = offset * limit;
      let sort = { createAt: -1 };

      _.each(QUERY_TO_COND_PARAMS, (transKey, key) => {
        if (query[key] !== void 0) {
          Object.assign(cond, {
            [transKey]: query[key] ? { $ne: null } : null
          });
        }
      });

      _.forEach(SORT_PROPS, attr => {
        const queryAttr = _.camelCase(`sort ${attr}`);
        const value = query[queryAttr];

        if (value !== void 0) {
          sort = { [attr]: value > 0 ? 1: -1, ...sort };
          return false;
        }
      });

      return { cond, skip, limit, sort };
    })

    // query channel doc
    .then(({ cond, skip, limit, sort }) => (
      Channel.find(cond).skip(skip).limit(limit).sort(sort)
        .then(channels => ({ cond, channels }))
    ))

    // count query docs
    .then(({ cond, channels }) => (
      Channel.count(cond).then(total => ({ total, channels }))
    ))

    // send result
    .then(({ total, channels }) => {
      channels = channels.map(channel => channel.toObject());

      res.send({ total, channels });
    })

    // .then(channels => channels.map(channel => channel.toObject()))

    // .then(result => res.send(result))
    .catch(err => handleError(res, err));
};
