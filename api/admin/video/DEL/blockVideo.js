const handleResult = reqlib('./utils/response/handleResult');
const handleError = reqlib('./utils/response/handle-error');
const authToken = reqlib('./utils/token/auth/account');
const createLog = reqlib('./utils/createAccountLog');

const validateObjectId = reqlib('./utils/validate-objectid');
const injectProps = reqlib('./utils/model-injector/video');

const Video = reqlib('./models/Video');

const ACTION = 'ADMIN_VIDEO_DEL_BLOCK_VIDEO';

module.exports = (req, res, next) => {
  const log = createLog(req, ACTION);

  authToken(req, ACTION, { log })

    // validate `videoId`
    .then(token => validateObjectId(req.params.videoId))

    // query loop video doc
    .then(videoId => Video.findById(videoId, 'publishAt'))

    // ensure loop video exists
    .then(video => {
      if (!video) {
        return Promise.reject(
          new ResponseError(404, 'video not found')
        );
      }

      if (!video.publishAt) {
        return Promise.reject(
          new ResponseError(403, 'video has been blocked')
        );
      }

      const doc = {
        $set: {
          publishAt: null,
          recommendAt: null
        }
      };

      return Video.findByIdAndUpdate(video._id, doc, { new: true });
    })

    // inject props
    .then(video => injectProps(null, video, 'toObject'))

    .then(video => handleResult(res, { video }, log))
    .catch(err => handleError(res, err));
};
