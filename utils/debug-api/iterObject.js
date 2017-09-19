const colors = require('colors/safe');
const debug = require('debug')('api');

const iterObject = module.exports = (object, tabSize = 2) => {
  _.forEach(object, (value, key) => {
    debug(_.repeat('  ', tabSize), colors.gray(key), colors.grey(':'), value);
  });
};
