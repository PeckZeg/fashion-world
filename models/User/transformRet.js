const toUrl = reqlib('./utils/qiniu/toUrl');

module.exports = ret => {
  ret.avatar = toUrl(ret.avatar);
  return ret;
};
