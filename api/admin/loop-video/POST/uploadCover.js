const path = require('path');

const injectProps = reqlib('./utils/model-injector/loop-video');
const validateObjectId = reqlib('./utils/validate-objectid');
const handleError = reqlib('./utils/response/handle-error');
const authToken = reqlib('./utils/keys/account/auth-token');
const uploadFile = reqlib('./utils/uploadFile');
const upload = reqlib('./utils/multer/upload');

const LoopVideo = reqlib('./models/LoopVideo');

const ACTION = config.apiActions['admin:loop-video:post:upload-loop-video-cover'];
const { folders: UPLOAD_FOLDERS } = config.ftpServer.resource;
const { basePathname: RESOURCE_BASEPATHNAME } = config.ftpToHttp.resource;
const OPTS = { new: true };

module.exports = (req, res) => {
  authToken(ACTION, req.header('authorization'))

    // validate `loopVideoId`
    .then(token => validateObjectId(req.params.loopVideoId))

    // query loop video doc
    .then(loopVideoId => LoopVideo.findById(loopVideoId))

    // ensure loop video exists
    .then(loopVideo => (
      loopVideo ? loopVideo : Promise.reject(
        new ResponseError(404, 'loop video not found')
      )
    ))

    // upload cover
    .then(loopVideo => (
      uploadFile(
        req,
        res,
        upload.single('cover'),
        path.join(UPLOAD_FOLDERS.images, 'loop-video', loopVideo._id.toString())
      )
        .then(pathname => path.join('/', RESOURCE_BASEPATHNAME, pathname))
        .then(cover => ({ loopVideo, cover }))
    ))

    // update loop video
    .then(({ loopVideo, cover }) => (
      LoopVideo.findByIdAndUpdate(loopVideo._id, { $set: { cover } }, OPTS)
    ))

    // inject props
    .then(loopVideo => injectProps(null, loopVideo, 'toObject'))

    .then(loopVideo => res.send({ loopVideo }))
    .catch(err => handleError(res, err));
};
