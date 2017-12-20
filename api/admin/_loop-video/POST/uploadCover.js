const path = require('path');

const handleResult = reqlib('./utils/response/handleResult');
const handleError = reqlib('./utils/response/handle-error');
const authToken = reqlib('./utils/token/auth/account');
const createLog = reqlib('./utils/createAccountLog');

const injectProps = reqlib('./utils/model-injector/loop-video');
const validateObjectId = reqlib('./utils/validate-objectid');
const uploadFile = reqlib('./utils/uploadFile');
const upload = reqlib('./utils/multer/upload');

const LoopVideo = reqlib('./models/LoopVideo');

const ACTION = 'ADMIN_LOOP_VIDEO_POST_UPLOAD_LOOP_VIDEO_COVER';
const { folders: UPLOAD_FOLDERS } = config.ftpServer.resource;
const { basePathname: RESOURCE_BASEPATHNAME } = config.ftpToHttp.resource;

module.exports = (req, res) => {
  const log = createLog(req, ACTION);

  authToken(req, ACTION, { log })

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
      LoopVideo.findByIdAndUpdate(loopVideo._id, { $set: { cover } }, { new: true })
    ))

    // inject props
    .then(loopVideo => injectProps(null, loopVideo, 'toObject'))

    .then(loopVideo => handleResult(res, { loopVideo }, log))
    .catch(err => handleError(res, err));
};
