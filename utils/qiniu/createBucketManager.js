const createMac = require('./createMac');
const qiniu = require('qiniu');

module.exports = conf => {;
  if (conf === void 0) {
    conf = new qiniu.conf.Config();
    conf.zone = config.qiniu.zone;
  }

  return new qiniu.rs.BucketManager(createMac(), conf);
};
