const debug = require('debug')('migrate');
const uuid = require('uuid/v4');
const qiniu = require('qiniu');
const path = require('path');

const startsWith = require('lodash/startsWith');
const replace = require('lodash/replace');
const repeat = require('lodash/repeat');
const map = require('lodash/map');

const downloadFtpFile = require('./downloadFtpFile');
const uploadToQiniu = require('./uploadToQiniu');
const syncUtils = require('scripts/utils');

const DefinitionVideo = require('models/DefinitionVideo');

const { resource: connect  } = config.ftpServer;
const { videos: bucket } = config.qiniu.bucket;
const DEFAULT_RETURN = [];

module.exports = async ({ sourceId } = {}, opts = {}) => {
  if (!sourceId) return DEFAULT_RETURN;

  const { space = repeat(' ', 4) } = opts;
  const defs = map(await DefinitionVideo.find({ sourceId }), 'filepath');

  let definitions = [];

  for (let src of defs) {
    if (startsWith(src, '/static')) {
      src = replace(src, /^\/static/, '');
      const extname = path.extname(src);
      let dest = path.join('/tmp', `${uuid()}${extname}`);

      debug(`${space}正在下载视频`);
      await downloadFtpFile(src, dest, { connect });
      debug(`${space}完成下载视频`);

      const sha1 = await syncUtils.file.genSha1(dest);
      dest = await syncUtils.file.rename(
        dest, path.join('/tmp', `${sha1}${extname}`)
      );

      const avinfo = await syncUtils.ffmpeg.ffprobe(dest);
      const { height: definition } = avinfo.streams[0];

      debug(`${space}正在上传 ${definition}p 视频`);
      definitions.push({
        definition: `${definition}p`,
        key: await uploadToQiniu(dest, {
          type: 'videos',
          key: `${sha1}${extname}`
        })
      });

      debug(`${space}清理本地 ${definition}p 视频`);
      await syncUtils.file.unlink(dest);

      debug(`${space}成功转换 ${definition}p 视频`);
    }
  }

  return definitions;
};
