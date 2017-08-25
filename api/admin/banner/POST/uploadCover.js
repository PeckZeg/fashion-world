const path = require('path');

const validateObjectId = reqlib('./utils/validate-objectid');
const handleError = reqlib('./utils/response/handle-error');
const authToken = reqlib('./utils/keys/account/auth-token');
const injectProps = reqlib('./utils/model-injector/banner');
const uploadFile = reqlib('./utils/uploadFile');
const upload = reqlib('./utils/multer/upload');

const Banner = reqlib('./models/Banner');

const ACTION = config.apiActions['admin:banner:post:upload-banner-cover'];
const { folders: UPLOAD_FOLDERS } = config.ftpServer.resource;
const { basePathname: RESOURCE_BASEPATHNAME } = config.ftpToHttp.resource;
const OPTS = { new: true };

module.exports = (req, res, next) => {
  authToken(ACTION, req.header('authorization'))

    // validate `bannerId`
    .then(token => validateObjectId(req.params.bannerId))

    // query banner doc
    .then(bannerId => Banner.findById(bannerId))

    // ensure banner exists
    .then(banner => (
      banner ? banner : Promise.reject(
        new ResponseError(404, 'banner not found')
      )
    ))

    // upload cover
    .then(banner => (
      uploadFile(
        req,
        res,
        upload.single('cover'),
        path.join(UPLOAD_FOLDERS.images, 'banner', banner._id.toString())
      )
        .then(pathname => path.join('/', RESOURCE_BASEPATHNAME, pathname))
        .then(cover => ({ banner, cover }))
    ))

    // update banner
    .then(({ banner, cover }) => (
      Banner.findByIdAndUpdate(banner._id, { $set: { cover } }, OPTS)
    ))

    // inject props
    .then(injectProps)

    .then(banner => res.send({ banner }))
    .catch(err => handleError(res, err));
};
