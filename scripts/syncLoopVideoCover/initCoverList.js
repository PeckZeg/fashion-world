const debug = require('debug')('sync');
const qiniu = require('qiniu');
const glob = require('glob');
const path = require('path');
const fs = require('fs');
const os = require('os');

const createBucketManager = require('utils/qiniu/createBucketManager');
const createFormUploader = require('utils/qiniu/createFormUploader');
const createUploadToken = require('utils/qiniu/createUploadToken');
const fileUtils = require('scripts/utils/file');

const { images: bucket } = config.qiniu.bucket;
const SRC = path.join(__dirname, 'cover');
const mimeLimit = 'image/jpeg;image/png';

module.exports = async function() {
  // const destFolder = fs.mkdtempSync(path.join(os.tmpdir(), 'cover-'));
  let covers = [];

  debug(`🐉  正在上传待替换的封面`);

  for (const sourcename of glob.sync('*', { cwd: SRC })) {
    debug(`  🥦  正在上传封面 ${sourcename}`);
    const formUploader = createFormUploader();
    const putExtra = new qiniu.form_up.PutExtra();
    const sourcepath = path.join(SRC, sourcename);
    const ext = path.extname(sourcename);
    const sha1 = await fileUtils.genSha1(sourcepath);
    const key = `${sha1}${ext}`;
    const scope = `${bucket}:${key}`;
    const uploadToken = createUploadToken({ scope, mimeLimit });
    const [respBody, respInfo] = await formUploader.putFileAsync(
      uploadToken, key, sourcepath, putExtra
    );

    if (respInfo.statusCode !== 200) {
      throw new ResponseError(respInfo.statusCode, respBody.error);
    }

    covers.push(key);

    debug(`  🌟  成功上传封面 ${sourcename}`);
  }

  debug(`🧀  完成上传待替换的封面`);

  return covers;
};
