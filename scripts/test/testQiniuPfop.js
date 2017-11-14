const uuid = require('uuid/v4');
const qiniu = require('qiniu');
const path = require('path');

const globalMixins = require('../../utils/global-mixins');
const fetchPublicUrl = require('utils/ip/fetchPublicUrl');
const createConfig = require('utils/qiniu/createConfig');
const createMac = require('utils/qiniu/createMac');

const { urlsafeBase64Encode: encode } = qiniu.util;
const { videos: bucket } = config.qiniu.bucket;

(async () => {
  const mac = createMac();
  const conf = createConfig();
  const operManager = new qiniu.fop.OperationManager(mac, config);
  const key = '9a09bbd2e657fc6a7bd3769a61dff836494291fc.mp4';
  const saveas = encode(`${bucket}:${uuid()}${path.extname(key)}`);
  const fops = [
    `avthumb/mp4/vb/386k/vcodec/libx264/acodec/libfdk_aac/s/?x360|saveas/${saveas}`
  ];
  const pipeline = 'video';
  const opts = {
    notifyURL: await fetchPublicUrl('/api/video/qiniu'),
    force: true
  };

  console.log(opts);

  const [respBody, respInfo] = await operManager.pfopAsync(bucket, key, fops,
      pipeline, opts);

  console.log({respBody, respInfo});
})();
