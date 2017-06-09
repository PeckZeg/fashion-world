const auth = reqlib('./utils/access-keys/account/auth');
const Video = reqlib('./models/Video');
const transformQuery = reqlib('./utils/transform-query');
const validateObjectId = reqlib('./utils/validate-objectid');
const mapSources = reqlib('./utils/models/video/map-sources');
const mapChannels = reqlib('./utils/models/video/map-channels');
const mapCategories = reqlib('./utils/models/video/map-categories');
const handleError = reqlib('./utils/catchMongooseError');
const CaaError = reqlib('./utils/CaaError');

const ACTION = config.apiActions['admin:video:get:fetch-profile'];

module.exports = (req, res, next) => {
  auth(req.header('authorization'), ACTION, false)

    // validate `videoId`
    .then(() => validateObjectId(req.params.videoId))

    // fetch video doc
    .then(videoId => new Promise((resolve, reject) => {
      Video.findById(videoId)
        .then(video => {
          if (!video) return reject(CaaError(404, 'video not found'));
          resolve(video);
        })
        .catch(err => reject(handleError(err)));
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
