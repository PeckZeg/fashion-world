const createUploadToken = reqlib('./utils/qiniu/createUploadToken');
const handleError = reqlib('./utils/response/handleError');
const authToken = reqlib('./utils/token/auth/user');

const ACTION = 'CLIENT_QINIU_GET_FETCH_UPLOAD_TOKEN';
const { images: BUCKET } = config.qiniu.bucket;

module.exports = async (req, res, next) => {
  const uploadToken = createUploadToken({
    scope: BUCKET
  });

  res.send({ uploadToken });
};
