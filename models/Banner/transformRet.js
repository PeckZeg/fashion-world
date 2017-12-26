const toUrl = reqlib('./utils/qiniu/toUrl');

module.exports = ret => {
  ret.cover = toUrl(ret.cover);
  return ret;
};
