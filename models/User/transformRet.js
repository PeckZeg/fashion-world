const toUrl = reqlib('./utils/toResFtpUrl');
const { defaultAvatar } = config.model.user;

module.exports = ret => {
  ret.avatar = toUrl(ret.avatar || defaultAvatar);
  return ret;
};
