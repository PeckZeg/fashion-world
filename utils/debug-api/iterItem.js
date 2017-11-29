const colors = require('colors/safe');
const debug = require('debug')('api');

const isPlainObject = require('lodash/isPlainObject');
const forEach = require('lodash/forEach');
const isArray = require('lodash/isArray');
const repeat = require('lodash/repeat');

const iter = module.exports = (item, space = repeat(' ', 2), opts = {}) => {
  const { tab = repeat(' ', 2) } = opts;

  forEach(item, (value, key) => {
    let debugArgs = [
      space,
      colors.gray(key),
      colors.gray(':')
    ];

    if (isArray(item)) {
      debugArgs.splice(1, 2, colors.gray('-'));
    }

    if (isPlainObject(value)) {
      debug(...debugArgs);
      iter(value, `${space}${tab}`);
    }

    else if (isArray(value)) {
      debug(...debugArgs);
      iter(value, `${space}${tab}`)
    }

    else {
      debugArgs.push(value);
      debug(...debugArgs);
    }
  });
};
