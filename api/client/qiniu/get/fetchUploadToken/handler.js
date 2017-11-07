const crypto = require('crypto');
const uuid = require('uuid/v4');
const path = require('path');

const createUploadToken = require('utils/qiniu/createUploadToken');
const handleError = require('utils/response/handleError');
const authToken = require('utils/token/auth/user');

const ACTION = 'CLIENT_QINIU_GET_FETCH_UPLOAD_TOKEN';
const { images: bucket } = config.qiniu.bucket;

module.exports = async (req, res, next) => {
  try {
    const token = await authToken(req, ACTION);
    const sha1 = crypto.createHash('sha1').update(uuid()).digest('hex');
    const key = `tmp/${sha1}`;
    const scope = `${bucket}:${key}`;
    const uploadToken = createUploadToken({
      scope,
      mimeLimit: 'image/jpeg;image/png'
    });

    res.send({ key, uploadToken });
  }

  catch (err) {
    handleError(res, err);
  }
};
