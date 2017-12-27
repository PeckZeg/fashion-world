const assign = require('lodash/assign');
const map = require('lodash/map');

const toUrl = reqlib('./utils/qiniu/toUrl');

const { defaultCover } = config.model.video;

module.exports = ret => {
  ret.cover = toUrl(ret.cover || defaultCover);

  ret.definitions = map(ret.definitions, ({ key, definition }) => ({
    definition,
    url: toUrl('videos', key)
  }));

  ret.screenshots = map(ret.screenshots, img => toUrl(img));

  return ret;
};
