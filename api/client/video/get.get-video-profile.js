const Video = reqlib('./models/Video');
const VideoChannel = reqlib('./models/VideoChannel');
const VideoChannelCategory = reqlib('./models/VideoChannelCategory');
const catchMongooseError = reqlib('./utils/catchMongooseError');
const CaaError = reqlib('./utils/CaaError');
const validateObjectId = reqlib('./utils/validate-objectid');

module.exports = (req, res, next) => {
  const { videoId } = req.params;

  Promise.resolve(videoId)

    //  Validate `videoId`
    .then(validateObjectId)

    // Query Video
    .then(videoId => new Promise((resolve, reject) => {
      Video.findById(videoId)
        .then(video => {
          if (!video) return reject(CaaError(404, 'video not found'));
          resolve(video.toJSON({ virtuals: true }));
        })
        .catch(err => reject(catchMongooseError(err)))
    }))

    // Query Channel
    .then(video => new Promise((resolve, reject) => {
      VideoChannel.findById(video.channelId)
        .then(channel => resolve({ ...video, channel }))
        .catch(err => reject(catchMongooseError(err)));
    }))

    // Query Category
    .then(video => new Promise((resolve, reject) => {
      VideoChannelCategory.findById(video.categoryId)
        .then(category => resolve({ ...video, category }))
        .catch(err => reject(catchMongooseError(err)));
    }))

    .then(video => res.send({ video }))
    .catch(err => res.status(err.status || 500).send({ message: err.message }));
};
