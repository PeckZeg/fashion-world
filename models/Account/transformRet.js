const toUrl = require('utils/qiniu/toUrl');
const { avatar: defaultAvatar } = config.images;

module.exports = ret => {
  ret.avatar = toUrl(ret.avatar);
  return ret;
};
