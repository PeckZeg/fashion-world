const toUrl = reqlib('./utils/qiniu/toUrl');
const { defaultCover } = config.model.video;

module.exports = ret => {
  ret.cover = toUrl(ret.cover || defaultCover);
  return ret;
};
