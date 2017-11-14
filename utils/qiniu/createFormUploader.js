const qiniu = require('qiniu');

module.exports = () => {
  let conf = new qiniu.conf.Config();
      conf.zone = config.qiniu.zone;

  return new qiniu.form_up.FormUploader(config);
};
