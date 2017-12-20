const handleResult = reqlib('./utils/response/handleResult');
const handleError = reqlib('./utils/response/handle-error');
const authToken = reqlib('./utils/token/auth/account');
const createLog = reqlib('./utils/createAccountLog');

const validateObjectId = reqlib('./utils/validate-objectid');
const injectProps = reqlib('./utils/model-injector/video');

const Video = reqlib('./models/Video');

const ACTION = 'ADMIN_VIDEO_GET_FETCH_VIDEO_PROFILE';

module.exports = (req, res, next) => {
  const log = createLog(req, ACTION);

  authToken(req, ACTION, { log })

    // validate `videoId`
    .then(token => validateObjectId(req.params.videoId))

    // query doc
    .then(videoId => Video.findById(videoId))

    // ensure doc
    .then(video => {
      if (!video) {
        return Promise.reject(
          new ResponseError(404, 'video not found')
        );
      }

      return injectProps(null, video, 'toObject');
    })

    .then(video => handleResult(res, { video }, log))
    .catch(err => handleError(res, err));
};
