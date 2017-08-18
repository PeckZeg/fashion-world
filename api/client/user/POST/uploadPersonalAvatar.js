const path = require('path');

const handleError = reqlib('./utils/response/handle-error');
const authToken = reqlib('./utils/keys/user/auth-token');
const uploadFile = reqlib('./utils/uploadFile');
const upload = reqlib('./utils/multer/upload');

const User = reqlib('./models/User');

const ACTION = config.apiActions['client:user:post:upload-personal-avatar'];
const { folders: UPLOAD_FOLDERS } = config.ftpServer.resource;
const { basePathname: RESOURCE_BASEPATHNAME } = config.ftpToHttp.resource;
const OPTS = { new: true };

module.exports = (req, res, next) => {
  authToken(ACTION, req.header('authorization'))

    // upload cover
    .then(({ userId }) => (
      uploadFile(
        req,
        res,
        upload.single('avatar'),
        path.join(UPLOAD_FOLDERS.images, 'user', userId.toString(), 'avatar')
      )
        .then(pathname => path.join('/', RESOURCE_BASEPATHNAME, pathname))
        .then(avatar => ({ userId, avatar }))
    ))

    // update user
    .then(({ userId, avatar }) => (
      User.findByIdAndUpdate(userId, { $set: { avatar } }, OPTS)
    ))

    // transform
    .then(user => user.toJSON())

    .then(user => res.send({ user }))
    .catch(err => handleError(res, err));
};
