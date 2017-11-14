const debug = require('debug')('migrate');
const uuid = require('uuid/v4');
const qiniu = require('qiniu');
const path = require('path');

const isFunction = require('lodash/isFunction');

const createBucketManager = require('utils/qiniu/createBucketManager');
const createFormUploader = require('utils/qiniu/createFormUploader');
const createUploadToken = require('utils/qiniu/createUploadToken');
const fetchFileSha1 = require('utils/qiniu/fetchFileSha1');

const syncUtils = require('../../utils');

const { images: bucket } = config.qiniu.bucket;

module.exports = async (src = '', moveKeyGenerator) => {
  const client = await syncUtils.ftp.create();
  const extname = path.extname(src || '');
  const dest = path.join('/tmp', `${uuid()}${extname}`);

  src = (src || '').replace(/^\/static/, '');

  await syncUtils.ftp.connect(client, config.ftpServer.resource);
  await syncUtils.ftp.get(client, src, dest);
  await syncUtils.ftp.end(client);

  const formUploader = createFormUploader();
  const putExtra = new qiniu.form_up.PutExtra();
  const key = `tmp/${uuid()}${extname}`;
  const scope = `${bucket}:${key}`;
  const uploadToken = createUploadToken({
    scope,
    mimeLimit: 'image/jpeg;image/png'
  });

  const [respBody, respInfo] = await formUploader.putFileAsync(uploadToken,
      key, dest, putExtra);

  if (respInfo.statusCode !== 200) {
    throw new ResponseError(respInfo.statusCode, respBody.error);
  }

  const bucketManager = createBucketManager();
  const sha1 = `${await fetchFileSha1(key)}${extname}`;
  const moveKey = isFunction(moveKeyGenerator) ? moveKeyGenerator(sha1) : sha1;

  await bucketManager.moveAsync(bucket, key, bucket, moveKey, { force: true });

  await syncUtils.file.unlink(dest);

  return moveKey;
};
