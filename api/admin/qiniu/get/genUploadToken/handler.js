const crypto = require('crypto');
const uuid = require('uuid/v4');
const path = require('path');

const createUploadToken = require('utils/qiniu/createUploadToken');
const handleError = require('utils/response/handleError');
const authToken = require('utils/token/auth/account');

const ACTION = 'ADMIN_QINIU_GET_GENERATE_UPLOAD_TOKEN';
const { images: bucket } = config.qiniu.bucket;
const { images: host } = config.qiniu.host;

module.exports = async (req, res, next) => {
  try {
    const token = await authToken(req, ACTION);
    const extname = path.extname(req.query.filename || '');
    const sha1 = crypto.createHash('sha1').update(uuid()).digest('hex');
    const key = `tmp/${sha1}${extname}`;
    const scope = `${bucket}:${key}`;
    const uploadToken = createUploadToken({ scope });

    res.send({
      host,
      key,
      bucket,
      uploadToken
    });
  }

  catch(err) {
    handleError(res, err);
  }
};
