const VideoChannelCategory = reqlib('./models/VideoChannelCategory');
const catchMongooseError = reqlib('./utils/catchMongooseError');
const validateParams = reqlib('./validate-models/client/video/channel-category/list-query-params');
const validateObjectId = reqlib('./utils/validate-objectid');
const CaaError = reqlib('./utils/CaaError');

module.exports = (req, res, next) => {
  let { query } = req;
  let { channelId } = req.params;

  Promise.resolve({ query, channelId })

    // Validate `channelId`
    .then(({ query, channelId }) => new Promise((resolve, reject) => {
      validateObjectId(channelId)
        .then(channelId => resolve({ query, channelId }))
        .catch(reject);
    }))

    // Validate Query Params
    .then(({ query, channelId }) => new Promise((resolve, reject) => {
      validateParams(query)
        .then(query => resolve({ query, channelId }))
        .catch(reject);
    }))

    //  Extend Query Params
    .then(({ query, channelId }) => (
      Object.assign({ isActive: true, channelId }, query)
    ))

    //  Query Channel's Categories
    .then(query => VideoChannelCategory.find(query).sort({ priority: -1 }))

    .then(categories => res.send({ categories }))
    .catch(err => res.status(err.status || 500).send({ message: err.message }));
};
