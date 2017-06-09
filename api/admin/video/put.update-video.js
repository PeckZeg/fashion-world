const Video = reqlib('./models/Video');

const caaError = reqlib('./utils/CaaError');
const auth = reqlib('./utils/access-keys/account/auth');
const mapSources = reqlib('./utils/models/video/map-sources');
const mapChannels = reqlib('./utils/models/video/map-channels');
const mapCategories = reqlib('./utils/models/video/map-categories');
const validateParams = reqlib('./validate-models/admin/video/update-video-params');
const validateObjectId = reqlib('./utils/validate-objectid');
const handleError = reqlib('./utils/catchMongooseError');

const ACTION = config.apiActions['admin:video:put:update-video'];

module.exports = (req, res, next) => {
  auth(req.header('authorization'), ACTION, false)

    // validate videoId
    .then(() => validateObjectId(req.params.videoId))

    // validate body
    .then(videoId => new Promise((resolve, reject) => {
      validateParams(req.body)
        .then(body => resolve({ videoId, body }))
        .catch(err => reject(handleError(err)));
    }))

    //  update doc
    .then(({ videoId, body }) => Video.findByIdAndUpdate(
      videoId,
      { $set: body },
      { new: true }
    ))

    // check video exists
    .then(video => new Promise((resolve, reject) => {
      if (!video) return reject(caaError(404, 'video not found'));
      resolve(video);
    }))

    // transform video doc
    .then(video => video.toJSON({ virtuals: true }))

    // inject `source`
    .then(video => mapSources(video))

    // inject `channel`
    .then(video => mapChannels(video))

    // inject `category`
    .then(video => mapCategories(video))

    // get video from videos
    .then(video => video[0])

    .then(video => res.send({ video }))
    .catch(err => res.status(err.status || 500).send({ message: err.message }));
};
