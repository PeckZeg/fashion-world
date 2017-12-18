const debug = require('debug')('migrate');
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
  if (!src || !startsWith(src, '/static')) return null;

  const client = await syncUtils.ftp.create();
  const extname = path.extname(src);
  let dest = path.join('/tmp', `${uuid()}${extname}`);

  src = replace(src, /^\/static/, '');

  await syncUtils.ftp.connect(client, config.ftpServer.resource);
  await syncUtils.ftp.get(client, src, dest);
  await syncUtils.ftp.end(client);

  const sha1 = await syncUtils.file.genSha1(dest);
  const key = `${sha1}${extname}`;
  dest = await syncUtils.file.rename(dest, path.join('/tmp', key));

  const formUploader = createFormUploader();
  const putExtra = new qiniu.form_up.PutExtra();
  const scope = `${bucket}:${key}`;
  const uploadToken = createUploadToken({
    scope,
    mimeLimit: 'image/jpeg;image/png'
  });

  const [respBody, respInfo] = await formUploader.putFileAsync(
    uploadToken, key, dest, putExtra
  );

  if (respInfo.statusCode !== 200) {
    throw new ResponseError(respInfo.statusCode, respBody.error);
  }

  if (fs.existsSync(dest)) {
    await syncUtils.file.unlink(dest);
  }

  return key;
};
