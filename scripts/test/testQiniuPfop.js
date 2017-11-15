const uuid = require('uuid/v4');
const qiniu = require('qiniu');
const path = require('path');

const globalMixins = require('../../utils/global-mixins');
const fetchVideoInfo = require('utils/qiniu/fetchVideoInfo');
const fetchPublicUrl = require('utils/ip/fetchPublicUrl');
const createConfig = require('utils/qiniu/createConfig');
const createMac = require('utils/qiniu/createMac');

const { urlsafeBase64Encode: encode } = qiniu.util;
const { videos: bucket } = config.qiniu.bucket;
const key = '4fdd04cbe032fc1bf08363ac1c7f80fc7ddd687f.mp4';

(async () => {
  const info = await fetchVideoInfo('videos', key);
  const { width, height } = info.streams[0];
  const dHeight = 360;
  const dWidth = Math.floor(width / height * dHeight);
  const s = `${dWidth}x${dHeight}`;

  const mac = createMac();
  const conf = createConfig();
  const operManager = new qiniu.fop.OperationManager(mac, config);
  const saveas = encode(`${bucket}:${uuid()}${path.extname(key)}`);
  const fops = [
    `avthumb/mp4/vb/386k/vcodec/libx264/acodec/libfdk_aac/s/${s}|saveas/${saveas}`
  ];
  const pipeline = 'video';
  const opts = {
    notifyURL: await fetchPublicUrl('/api/video/qiniu'),
    force: true
  };

  const [respBody, respInfo] = await operManager.pfopAsync(bucket, key, fops,
      pipeline, opts);

  console.log({respBody, respInfo});
})();
