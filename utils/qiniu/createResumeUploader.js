const qiniu = require('qiniu');
const createConfig = require('./createConfig');

module.exports = () => {
  const conf = createConfig();

  return new qiniu.resume_up.ResumeUploader(conf);
};
