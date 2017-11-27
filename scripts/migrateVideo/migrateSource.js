const debug = require('debug')('migrate');
const qiniu = require('qiniu');
const path = require('path');

const replace = require('lodash/replace');

const downloadFtpFile = require('./downloadFtpFile');
const uploadToQiniu = require('./uploadToQiniu');
const syncUtils = require('scripts/utils');

const { fashionOne: connect  } = config.ftpServer;
const { videos: bucket } = config.qiniu.bucket;
const defs = [1080, 720, 480, 360];

module.exports = async src => {
  if (!src) return null;

  const space = repeat(' ', 4);
  let dest = path.join('/tmp', path.basename(src));

  debug(`${space}正在下载视频`);
  await downloadFtpFile(src, dest, { connect });
  debug(`${space}完成下载视频`);

  const extname = path.extname(dest);
  const sha1 = await syncUtils.file.genSha1(dest);
  dest = await syncUtils.file.rename(dest, path.join('/tmp', `${sha1}${extname}`));

  const avinfo = await syncUtils.ffmpeg.ffprobe(dest);
  const { width, height } = avinfo.streams[0];
  const definition = defs.filter(d => d <= height)[0] || 1080;
  const { filepath, filename } = await syncUtils.video.toDefinition(dest, definition);
  const key = await uploadToQiniu(filepath, { type: 'videos', key: filename });

  await syncUtils.file.unlink(dest);
  await syncUtils.file.unlink(filepath);

  return key;
};
