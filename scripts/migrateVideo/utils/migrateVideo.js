const debug = require('debug')('migrate');
const qiniu = require('qiniu');
const path = require('path');

const uploadFileToQiniu = require('./uploadFileToQiniu');
const downloadFtpFile = require('./downloadFtpFile');

const syncUtils = require('../../utils');
const { videos: bucket } = config.qiniu.bucket;

module.exports = async (filepath, rename) => {
  const localpath = path.join('/tmp', path.basename(filepath));
  const { fashionOne: connect  } = config.ftpServer;

  // download video from ftp
  await downloadFtpFile(filepath, localpath, { connect });

  // upload file to qiniu
  const sha1 = await syncUtils.file.genSha1(localpath);
  const key = await uploadFileToQiniu(localpath, { type: 'videos', rename, sha1 });

  await syncUtils.file.unlink(localpath);

  return key;
};
