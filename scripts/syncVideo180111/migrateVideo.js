const debug = require('debug')('sync');
const uuid = require('uuid/v4');
const qiniu = require('qiniu');
const path = require('path');

const repeat = require('lodash/repeat');
const map = require('lodash/map');

const uploadToQiniu = require('../migrateVideo2/uploadToQiniu');
const migrateImage = require('./migrateImage');
const downloadFtpFile = require('../utils/ftp/download');
const syncUtils = require('../utils');

const { sync: connect } = config.ftpServer;
const DEFINITIONS = [360, 480, 720, 1080];

module.exports = async function(ftpFile, opts = {}) {
  const { space = repeat(' ', 4) } = opts;

  const dirname = path.dirname(ftpFile);
  const basename = path.basename(ftpFile);
  const extname = path.extname(ftpFile);
  let tmpFile = path.join('/tmp', `${uuid()}${extname}`);

  debug(`${space}正在下载视频 ${basename}`);
  // await downloadFtpFile(ftpFile, tmpFile, { connect });
  await syncUtils.file.rename(ftpFile, tmpFile);
  debug(`${space}完成下载视频 ${basename}`);

  const sha1 = await syncUtils.file.genSha1(tmpFile);
  tmpFile = await syncUtils.file.rename(
    tmpFile, path.join('/tmp', `${sha1}${extname}`)
  );

  debug(`${space}正在截图`);
  const screenshots = await Promise.all(
    map(
      await syncUtils.video.screenshots(tmpFile),
      async screenshot => await migrateImage(screenshot)
    )
  );
  debug(`${space}完成截图`);

  const { height, size, duration } = await syncUtils.video.metadata(tmpFile);
  const DEFS = DEFINITIONS.filter(h => h <= height).map(d => `${d}p`);
  let definitions = [];

  for (const definition of DEFS) {
    debug(`${space}正在转换清晰度 ${definition} 的视频`);
    const {
      filepath,
      filename: key
    } = await syncUtils.video.toDefinition(tmpFile, definition);

    await uploadToQiniu(filepath, { type: 'videos', key });
    definitions.push({ definition, key });
    await syncUtils.file.unlink(filepath);

    debug(`${space}完成转换清晰度 ${definition} 的视频`);
  }

  debug(`${space}正在清理临时文件`);
  await syncUtils.file.unlink(tmpFile);
  debug(`${space}完成清理临时文件`);

  return {
    filename: path.basename(ftpFile),
    size,
    duration,
    screenshots,
    definitions
  };
};
