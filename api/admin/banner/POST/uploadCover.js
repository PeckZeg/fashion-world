const path = require('path');

const handleResult = reqlib('./utils/response/handleResult');
const handleError = reqlib('./utils/response/handle-error');
const validateObjectId = reqlib('./utils/validate-objectid');
const authToken = reqlib('./utils/keys/account/auth-token');
const injectProps = reqlib('./utils/model-injector/banner');
const createLog = reqlib('./utils/createAccountLog');
const uploadFile = reqlib('./utils/uploadFile');
const upload = reqlib('./utils/multer/upload');

const Banner = reqlib('./models/Banner');

const ACTION = 'ADMIN_BANNER_POST_UPLOAD_BANNER_COVER';
const { folders: UPLOAD_FOLDERS } = config.ftpServer.resource;
const { basePathname: RESOURCE_BASEPATHNAME } = config.ftpToHttp.resource;

module.exports = (req, res, next) => {
  const log = createLog(req, ACTION);
  const reqAt = +new Date();

  authToken(config.apiActions[ACTION], req.header('authorization'))

    // add `accountId` to log
    .then(token => log.setAccountId(token))

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
      Banner.findByIdAndUpdate(banner._id, { $set: { cover } }, { new: true })
    ))

    // inject props
    .then(injectProps)

    .then(banner => handleResult(res, { banner }, log, reqAt))
    .catch(err => handleError(res, err));
};
