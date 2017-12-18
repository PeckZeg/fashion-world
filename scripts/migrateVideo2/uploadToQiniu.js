const uuid = require('uuid/v4');
const qiniu = require('qiniu');
const path = require('path');
const fs = require('fs');

const isFunction = require('lodash/isFunction');

const createResumeUploader = require('utils/qiniu/createResumeUploader');
const createBucketManager = require('utils/qiniu/createBucketManager');
const createFormUploader = require('utils/qiniu/createFormUploader');
const createUploadToken = require('utils/qiniu/createUploadToken');
const fetchFileSha1 = require('utils/qiniu/fetchFileSha1');

/**
 *  上传文件至七牛
 *  @param {string} src 待上传文件路径
 *  @param {object} [opts] 配置项
 *  @param {string} [opts.type = 'images'] 上传类型，images|videos
 // *  @param {Function} [opts.rename] 重命名方法，`function (sha1, extname) {}`
 *  @returns {string} 返回七牛的存储键
 */
module.exports = async (src, opts = {}) => {
  const { type = 'images' } = opts;
  const bucket = config.qiniu.bucket[type];
  const extname = path.extname(src);
  const key = opts.key || `tmp/${uuid()}${extname}`;
  const resumeUploader = createResumeUploader();
  const formUploader = createFormUploader();
  const putExtra = new qiniu.form_up.PutExtra(`tmp/${uuid()}${extname}`, {
    'x:name': '',
    'x:age': 27
  });
  // putExtra.resumeRecordFile = `/tmp/${uuid()}-progress.log`;
  const scope = `${bucket}:${key}`;
  const uploadToken = createUploadToken({ scope });
  // const readableStream = fs.createReadStream(src);

  const [respBody, respInfo] = await resumeUploader.putFileAsync(uploadToken, key,
      src, putExtra);

  // const [respBody, respInfo] = await formUploader.putStreamAsync(uploadToken,
  //     key, readableStream, putExtra);

  if (respInfo.statusCode !== 200) {
    throw new ResponseError(respInfo.statusCode, respBody.error);
  }

  return key;
};
