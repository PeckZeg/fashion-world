const { reduce, isDate, isPlainObject } = require('lodash');
const PROPS_BLACK_LIST = [
  '__v',
  'id'
];

const transform = ret => reduce(ret, (ret, value, key) => {
  if (PROPS_BLACK_LIST.indexOf(key) > -1) {
    return ret;
  }

  if (isDate(value)) {
    value = +value;
  }

  else if (isPlainObject(value)) {
    value = transform(value);
  }

  ret[key] = value;

  return ret;
}, {});

module.exports = (doc, ret, options) => transform(ret);
