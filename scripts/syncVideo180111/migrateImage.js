const debug = require('debug')('sync');
const uuid = require('uuid/v4');
const qiniu = require('qiniu');
const path = require('path');
const fs = require('fs');

const startsWith = require('lodash/startsWith');
const replace = require('lodash/replace');

const createBucketManager = require('utils/qiniu/createBucketManager');
const createFormUploader = require('utils/qiniu/createFormUploader');
const createUploadToken = require('utils/qiniu/createUploadToken');
const syncUtils = require('scripts/utils');

const { images: bucket } = config.qiniu.bucket;

module.exports = async src => {
  if (!src) return null;

  const formUploader = createFormUploader();
  const putExtra = new qiniu.form_up.PutExtra();
  const key = path.basename(src);
  const scope = `${bucket}:${key}`;
  const uploadToken = createUploadToken({
    scope,
    mimeLimit: 'image/jpeg;image/png'
  });

  const [respBody, respInfo] = await formUploader.putFileAsync(
    uploadToken, key, src, putExtra
  );

  if (respInfo.statusCode !== 200) {
    throw new ResponseError(respInfo.statusCode, respBody.error);
  }

  if (fs.existsSync(src)) {
    await syncUtils.file.unlink(src);
  }

  return key;
};
