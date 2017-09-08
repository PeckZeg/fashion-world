const glob = require('glob');
const path = require('path');

module.exports = glob.sync('*/', {
  cwd: __dirname,
  realpath: true
}).reduce((actions, cwd) => {
  glob.sync('*.js', { cwd, realpath: true }).forEach(filename => {
    Object.assign(actions, require(filename));
  });

  return actions;
}, {});
