const debug = require('debug')('migrate');
const uuid = require('uuid/v4');
const qiniu = require('qiniu');
const path = require('path');

const replace = require('lodash/replace');
const repeat = require('lodash/repeat');

const downloadFtpFile = require('./downloadFtpFile');
const uploadToQiniu = require('./uploadToQiniu');
const syncUtils = require('scripts/utils');

const { fashionOne: connect  } = config.ftpServer;
const { videos: bucket } = config.qiniu.bucket;
const defs = [1080, 720, 480, 360];

module.exports = async (src, opts = {}) => {
  if (!src) return {};

  src = replace(src, /^\/WineLife_Channel_1080P/, '/WLC');

  const { space = repeat(' ', 4) } = opts;
  const extname = path.extname(src);
  let dest = path.join('/tmp', `${uuid()}${extname}`);

  debug(`${space}正在下载视频`);
  try {
    await downloadFtpFile(src, dest, { connect });
  }

  catch (err) {
    return {};
  }
  debug(`${space}完成下载视频`);

  const sha1 = await syncUtils.file.genSha1(dest);
  dest = await syncUtils.file.rename(
    dest, path.join('/tmp', `${sha1}${extname}`)
  );

  const avinfo = await syncUtils.ffmpeg.ffprobe(dest);
  const { width, height } = avinfo.streams[0];
  const beDefs = defs.filter(d => d <= height);

  let definitions = [];
  let tmpFiles = [dest];

  for (let definition of beDefs) {
    debug(`${space}正在转换 ${definition}p 视频`);
    const {
      filepath,
      filename
    } = await syncUtils.video.toDefinition(dest, definition);

    debug(`${space}正在上传 ${definition}p 视频`);
    definitions.push({
      definition: `${definition}p`,
      key: await uploadToQiniu(filepath, {
        type: 'videos',
        key: filename
      })
    });

    tmpFiles.push(filepath);
    debug(`${space}成功转换 ${definition}p 视频`);
  }

  debug(`${space}正在清理临时文件`);
  for (let tmpFile of tmpFiles) {
    await syncUtils.file.unlink(tmpFile);
  }
  debug(`${space}完成清理临时文件`);

  return definitions;
};
