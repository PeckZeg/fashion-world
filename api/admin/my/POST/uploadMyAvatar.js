const path = require('path');

const handleResult = reqlib('./utils/response/handleResult');
const handleError = reqlib('./utils/response/handle-error');
const authToken = reqlib('./utils/keys/account/auth-token');
const createLog = reqlib('./utils/createAccountLog');
const uploadFile = reqlib('./utils/uploadFile');
const upload = reqlib('./utils/multer/upload');

const Account = reqlib('./models/Account');

const ACTION = 'ADMIN_MY_UPLOAD_MY_AVATAR';
const { folders: UPLOAD_FOLDERS } = config.ftpServer.resource;
const { basePathname: RESOURCE_BASEPATHNAME } = config.ftpToHttp.resource;
const OPTS = { new: true };

module.exports = (req, res, next) => {
  const log = createLog(req, ACTION);
  const reqAt = +new Date();

  authToken(config.apiActions[ACTION], req.header('authorization'))

    // add `accountId` to log
    .then(token => log.setAccountId(token))

    // query account doc
    .then(({ accountId }) => Account.findById(accountId))

    // ensure account exists
    .then(account => (
      account ? account : Promise.reject(
        new ResponseError(404, 'account not found')
      )
    ))

    // upload avatar
    .then(account => (
      uploadFile(
        req,
        res,
        upload.single('avatar'),
        path.join(UPLOAD_FOLDERS.images, 'account', account._id.toString())
      )
        .then(pathname => path.join('/', RESOURCE_BASEPATHNAME, pathname))
        .then(avatar => ({ account, avatar }))
    ))

    // upload account
    .then(({ account, avatar }) => (
      Account.findByIdAndUpdate(account._id, { $set: { avatar } }, OPTS)
    ))

    // transform account
    .then(account => account.toObject())

    .then(account => handleResult(res, { account }, log, reqAt))
    .catch(err => handleError(res, err));
};
