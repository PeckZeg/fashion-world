/**
 *  该方法已废弃，请使用如下方法替代:
 *    const transform = reqlib('./utils/schema/transform');
 */

const _ = require('lodash');

const transform = ret => _.reduce(ret, (ret, value, key) => {
  if (['__v', 'id'].indexOf(key) > -1) return ret;

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
    ret = filter(ret);
  }

  return ret;
};
