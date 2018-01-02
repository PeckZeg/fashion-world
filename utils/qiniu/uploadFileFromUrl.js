const readChunk = require('read-chunk');
const fileType = require('file-type');
const request = require('request');
const uuid = require('uuid/v4');
const qiniu = require('qiniu');
const path = require('path');
const fs = require('fs');

require('../global-mixins');

const createFormUploader = require('utils/qiniu/createFormUploader');
const createUploadToken = require('utils/qiniu/createUploadToken');
const syncUtils = require('scripts/utils');

const download = src => new Promise((resolve, reject) => {
  const dest = `/tmp/${uuid()}`;
  const writeStream = fs.createWriteStream(dest);

  request(src)
    .on('response', response => resolve(dest))
    .on('error', reject)
    .pipe(fs.createWriteStream(dest));
});

const { images: bucket } = config.qiniu.bucket;

module.exports = async function(src) {
  if (!src) return null;

  const tmppath = await download(src);
  const sha1 = await syncUtils.file.genSha1(tmppath);
  const ext = fileType(readChunk.sync(tmppath, 0, 4100)).ext;
  const key = `${sha1}.${ext}`;
  const dest = await syncUtils.file.rename(tmppath, `/tmp/${key}`);

  const formUploader = createFormUploader();
  const putExtra = new qiniu.form_up.PutExtra();
  const scope = `${bucket}:${key}`;
  const uploadToken = createUploadToken({ scope });

  const [respBody, respInfo] = await formUploader.putFileAsync(uploadToken,
      key, dest, putExtra);

  if (respInfo.statusCode !== 200) {
    throw new ResponseError(respInfo.statusCode, respBody.error);
  }

  await syncUtils.file.unlink(dest);

  return key;
};
