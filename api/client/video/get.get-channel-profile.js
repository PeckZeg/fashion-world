const VideoChannel = reqlib('./models/VideoChannel');
const VideoChannelCategory = reqlib('./models/VideoChannelCategory');
const catchMongooseError = reqlib('./utils/catchMongooseError');
const CaaError = reqlib('./utils/CaaError');
const validateObjectId = reqlib('./utils/validate-objectid');

module.exports = (req, res, next) => {
  const { channelId } = req.params;

  Promise.resolve(channelId)

    // Validate `channelId`
    .then(validateObjectId)

    // Query Channel
    .then(channelId => new Promise((resolve, reject) => {
      VideoChannel.findById(channelId)
        .then(channel => {
          if (!channel) return reject(CaaError(404, 'channel not found'));
          resolve(channel);
        })
        .catch(err => reject(catchMongooseError(err)));
    }))

    // Query Channel Category
    .then(channel => new Promise((resolve, reject) => {
      VideoChannelCategory
        .find({ channelId: channel._id })
        .sort({ priority: -1 })
        .then(categories => {
          resolve(Object.assign(channel.toJSON(), { categories }));
        })
        .catch(err => reject(catchMongooseError(err)));
    }))

    .then(channel => res.send({ channel }))
    .catch(err => res.status(err.status || 500).send({ message: err.message }));
};
