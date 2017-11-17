const uuid = require('uuid/v4');
const qiniu = require('qiniu');
const path = require('path');

const fetchVideoInfo = require('utils/qiniu/fetchVideoInfo');

const { urlsafeBase64Encode: encode } = qiniu.util;

const conf = {
  '1080': { vb: '3072k' },
  '720': { vb: '1536k' },
  '480': { vb: '768k' },
  '360': { vb: '386k' }
};

const defs = Object.keys(conf).map(n => parseInt(n)).sort((a, b) => a - b);

/**
 *  生成各个格式的 fops 参数
 *  @param {string} type 类型
 *  @param {string} key 键
 *  @param {string[]} fops 参数
 */
module.exports = async (type, key) => {
  const avinfo = await fetchVideoInfo(type, key);
  const { width, height } = avinfo.streams[0];
  const bucket = config.qiniu.bucket[type];

  return defs.filter(h => h <= height).map(defHeight => {
    const defWidth = Math.floor(width / height * defHeight);
    const s = `${defWidth}x${defHeight}`;
    const saveas = encode(`${bucket}:tmp/${uuid()}${path.extname(key)}`);
    const { vb } = conf[defHeight];

    return `avthumb/mp4/vb/${vb}/vcodec/libx264/acodec/libfdk_aac/s/${s}|saveas/${saveas}`;
  });
};
