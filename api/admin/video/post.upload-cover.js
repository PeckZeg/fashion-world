const path = require('path');

const auth = reqlib('./utils/access-keys/account/auth');
const upload = reqlib('./utils/multer/upload');
const uploadFile = reqlib('./utils/upload-file');
const validateObjectId = reqlib('./utils/validate-objectid');
const injectSources = reqlib('./utils/models/video/map-sources');
const injectChannels = reqlib('./utils/models/video/map-channels');
const injectCategories = reqlib('./utils/models/video/map-categories');
const caaError = reqlib('./utils/CaaError');
const Video = reqlib('./models/Video');

const ACTION = config.apiActions['admin:video:post:upload-cover'];
const DESTINATION = '/images/video'
const OPTS = { new: true };

module.exports = (req, res, next) => {
  auth(req.header('authorization'), ACTION, false)

    // validate `videoId`
    .then(() => validateObjectId(req.params.videoId))

    // upload cover
    .then(videoId => new Promise((resolve, reject) => {
      uploadFile(upload.single('cover'), { req, res, destination: DESTINATION })
        .then(result => resolve({ videoId, ...result }))
        .catch(reject);
    }))

    // generate update doc
    .then(({ videoId, path }) => ({
      videoId,
      update: { $set: { cover: path } }
    }))

    // update video
    .then(({ videoId, update }) => new Promise((resolve, reject) => {
      Video.findByIdAndUpdate(videoId, update, OPTS)
        .then(video => {
          if (!video) return reject(caaError(404, 'video not found'));
          resolve(video);
        })
        .catch(err => reject(handleError(err)));
    }))

    // tojson
    .then(video => video.toJSON({ virtuals: true }))

    // inject source
    .then(injectSources)

    // inject channel
    .then(injectChannels)

    // inject category
    .then(injectCategories)

    .then(video => res.send({ video: video[0] }))
    .catch(err => res.status(err.status || 500).send({ message: err.message }));
};
