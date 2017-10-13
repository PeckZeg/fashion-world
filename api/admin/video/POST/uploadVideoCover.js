const path = require('path');

const handleResult = reqlib('./utils/response/handleResult');
const handleError = reqlib('./utils/response/handle-error');
const injectProps = reqlib('./utils/model-injector/video');
const authToken = reqlib('./utils/token/auth/account');
const createLog = reqlib('./utils/createAccountLog');

const validateObjectId = reqlib('./utils/validate-objectid');
const injectVideos = reqlib('./utils/model-injector/video');
const uploadFile = reqlib('./utils/uploadFile');
const upload = reqlib('./utils/multer/upload');

const Video = reqlib('./models/Video');

const ACTION = 'ADMIN_VIDEO_POST_UPLOAD_VIDEO_COVER';
const { folders: UPLOAD_FOLDERS } = config.ftpServer.resource;
const { basePathname: RESOURCE_BASEPATHNAME } = config.ftpToHttp.resource;

module.exports = (req, res, next) => {
  const log = createLog(req, ACTION);

  authToken(req, ACTION, { log })

    // validate `videoId`
    .then(token => validateObjectId(req.params.videoId))

    // query doc
    .then(videoId => Video.findById(videoId))

    // ensure entity exists
    .then(video => (
      video ? video : Promise.reject(
        new ResponseError(404, 'video not found')
      )
    ))

    // upload cover
    .then(video => (
      uploadFile(
        req,
        res,
        upload.single('cover'),
        path.join(UPLOAD_FOLDERS.images, 'video', video._id.toString())
      )
        .then(pathname => path.join('/', RESOURCE_BASEPATHNAME, pathname))
        .then(cover => ({ video, cover }))
    ))

    // update video
    .then(({ video, cover }) => (
      Video.findByIdAndUpdate(video._id, { $set: { cover } }, { new: true })
    ))

    // inject props
    .then(video => injectProps(null, video, 'toObject'))

    .then(video => handleResult(res, { video }, log))
    .catch(err => handleError(res, err));
};
