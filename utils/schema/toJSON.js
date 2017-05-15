const _ = require('lodash');

const transform = ret => _.reduce(ret, (ret, value, key) => {
  if (key === '__v') return ret;

  if (_.isDate(value)) {
    value = +value;
  }

  else if (_.isPlainObject(value)) {
    value = transform(value);
  }

  ret[key] = value;

  return ret;
}, {});

module.exports = filter => (doc, ret, cb) => {
  ret = transform(ret);

  if (typeof filter === 'function') {
    filter(ret);
  }

  return ret;
};
