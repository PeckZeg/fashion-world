const validateParams = reqlib('./validate-models/client/channel/fetch-channel-category-list-query-params');
const validateObjectId = reqlib('./utils/validate-objectid');
const handleError = reqlib('./utils/response/handle-error');

const Channel = reqlib('./models/Channel');
const Category = reqlib('./models/Category');

module.exports = (req, res, next) => {
  Promise.resolve(req.params.channelId)

    // validate `channelId`
    .then(channelId => validateObjectId(channelId, 'channelId'))

    // validate query params
    .then(channelId => (
      validateParams(req.query).then(query => ({ channelId, query }))
    ))

    // query channel
    .then(({ channelId, query }) => (
      Channel.findById(channelId).then(channel => ({ channel, query }))
    ))

    // check channel exists
    .then(({ channel, query }) => {
      if (!channel || !channel.publishAt || channel.removeAt) {
        return Promise.reject(new ResponseError(404, 'channel not found'));
      }

      return { channelId: channel._id, ...query };
    })

    // generate query doc
    .then(({ channelId, offset, limit }) => {
      const cond = {
        channelId,
        publishAt: { $lte: new Date() },
        removeAt: null
      };
      const skip = offset * limit;
      const sort = { priority: -1, publishAt: -1, createAt: -1 };

      return { cond, limit, skip, sort };
    })

    // query category docs
    .then(({ cond, limit, skip, sort }) => (
      Category.find(cond).skip(skip).limit(limit).sort(sort)
        .then(categories => categories)
    ))

    // transform categories
    .then(categories => categories.map(category => category.toJSON()))

    .then(categories => res.send({ categories }))
    .catch(err => handleError(res, err));
};
