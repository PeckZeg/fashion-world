const validateParams = reqlib('./validate-models/client/channel/fetch-profile-query-params');
const validateObjectId = reqlib('./utils/validate-objectid');
const handleError = reqlib('./utils/response/handle-error');
const transformQuery = reqlib('./utils/transform-query');

const Channel = reqlib('./models/Channel');
const Category = reqlib('./models/Category');
const TRANSFORM_QUERY_PARAMS = { injectCategories: Boolean };

module.exports = (req, res, next) => {
  Promise.resolve(req.params.channelId)

    // validate `channelId`
    .then(channelId => validateObjectId(channelId, 'channelId'))

    // transform query params
    .then(channelId => ({
      channelId,
      query: transformQuery(req.query, TRANSFORM_QUERY_PARAMS)
    }))

    // validate query params
    .then(({ channelId, query }) => (
      validateParams(query).then(query => ({ channelId, query }))
    ))

    // query channel doc
    .then(({ channelId, query }) => (
      Channel.findById(channelId).then(channel => ({ query, channel }))
    ))

    // check channel exists
    .then(({ query, channel }) => {
      if (!channel || !channel.publishAt || channel.removeAt) {
        return Promise.reject(new ResponseError(404, 'channel not found'));
      }

      return { query, channel };
    })

    .then(channel => res.send({ channel }))
    .catch(err => handleError(res, err));
};
