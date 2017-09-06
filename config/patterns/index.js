const glob = require('glob');
const path = require('path');

const PATTERN_FILES = glob.sync('*.js', {
  cwd: __dirname,
  ignore: ['index.js']
});

module.exports = PATTERN_FILES.reduce((patterns, filename) => {
  const prop = path.basename(filename, path.extname(filename));

  Object.assign(patterns, { [prop]: require(`./${filename}`) })

  return patterns;
}, {});
