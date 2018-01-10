const assign = require('lodash/assign');
const map = require('lodash/map');

const toUrl = reqlib('./utils/qiniu/toUrl');

const { defaultCover } = config.model.video;

module.exports = ret => {
  ret.cover = toUrl(ret.cover || defaultCover);

  ret.definitions = map(ret.definitions, ({ key, ...extra }) => ({
    key,
    url: toUrl('videos', key),
    ...extra
  }));

  ret.subtitleFiles = map(ret.subtitleFiles, ({ _id, key, ...extra }) => ({
    url: toUrl(key),
    key,
    ...extra
  }));

  ret.screenshots = map(ret.screenshots, img => toUrl(img));

  return ret;
};
