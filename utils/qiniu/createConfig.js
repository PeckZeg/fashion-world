const qiniu = require('qiniu');

module.exports = () => {
  const conf = new qiniu.conf.Config();
  conf.zone = config.qiniu.zone;

  return conf;
};
