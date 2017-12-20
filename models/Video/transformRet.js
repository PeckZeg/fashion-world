const map = require('lodash/map');
const assign = require('lodash/assign');

const toUrl = reqlib('./utils/qiniu/toUrl');

module.exports = ret => {
  ret.cover = toUrl(ret.cover);

  ret.definitions = map(ret.definitions, ({ key, definition }) => ({
    definition,
    url: toUrl('videos', key)
  }));

  ret.screenshots = map(ret.screenshots, img => toUrl(img));

  return ret;
};
