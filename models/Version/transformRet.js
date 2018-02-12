const padStart = require('lodash/padStart');

const toUrl = reqlib('./utils/qiniu/toUrl');

module.exports = ret => {
  ret.cover = toUrl(ret.cover);

  const { major = 0, minor = 0, revision = 0 } = ret.version;

  ret.version = `${major}.${minor}.${revision}`;

  return ret;
};
