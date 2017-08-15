const path = require('path');

const validateObjectId = reqlib('./utils/validate-objectid');
const handleError = reqlib('./utils/response/handle-error');
const authToken = reqlib('./utils/keys/account/auth-token');
const injectVideos = reqlib('./utils/model-injector/video');
const uploadFile = reqlib('./utils/uploadFile');
const upload = reqlib('./utils/multer/upload');

const Video = reqlib('./models/Video');

const ACTION = config.apiActions['admin:video:post:upload-video-cover'];
const { folders: UPLOAD_FOLDERS } = config.ftpServer.resource;
const { basePathname: RESOURCE_BASEPATHNAME } = config.ftpToHttp.resource;
const OPTS = { new: true };

module.exports = (req, res, next) => {
  authToken(ACTION, req.header('authorization'))

    // validate `videoId`
    .then(token => validateObjectId(req.params.videoId))

    // query video doc
    .then(videoId => Video.findById(videoId))

    // ensure video exists
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
      Video.findByIdAndUpdate(video._id, { $set: { cover } }, OPTS)
    ))

    // inject props
    .then(video => injectVideos(null, video, 'toObject'))

    .then(video => res.send({ video }))
    .catch(err => handleError(res, err));
};
