const auth = reqlib('./utils/access-keys/account/auth');
const Video = reqlib('./models/Video');
const transformQuery = reqlib('./utils/transform-query');
const validateObjectId = reqlib('./utils/validate-objectid');
const injectVideos = reqlib('./utils/models/inject/videos');
const handleError = reqlib('./utils/response/handle-error');
const caaError = reqlib('./utils/CaaError');

const ACTION = config.apiActions['admin:video:get:fetch-profile'];

module.exports = (req, res, next) => {
  auth(req.header('authorization'), ACTION, false)

    // validate `videoId`
    .then(() => validateObjectId(req.params.videoId))

    // fetch video doc
    .then(id => Video.findById(id))

    // check video exists
    .then(video => new Promise((resolve, reject) => {
      if (!video) return reject(caaError(404, 'video not found'));
      resolve(video);
    }))

    // transform video doc
    // .then(video => video.toJSON({ virtuals: true }))

    // inject `source`
    .then(video => injectVideos(video))
    // .then(video => mapSources(video))
    //
    // // inject `channel`
    // .then(video => mapChannels(video))
    //
    // // inject `category`
    // .then(video => mapCategories(video))

    // get video from videos
    .then(video => video[0])

    .then(video => res.send({ video }))
    .catch(err => res.status(err.status || 500).send({ message: err.message }));
};
