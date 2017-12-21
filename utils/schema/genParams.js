const isPlainObject = require('lodash/isPlainObject');
const camelCase = require('lodash/camelCase');
const isArray = require('lodash/isArray');
const reduce = require('lodash/reduce');
const keys = require('lodash/keys');

/**
 *  生成概要列表
 *  @param {object[]} props 属性表
 *  @returns {object} 生成概要列表
 */
module.exports = props => reduce(props, (props, { prop, shape, cond, enums }) => {
  if (prop && shape) {
    props[prop] = shape;
  }

  if (prop && isPlainObject(cond)) {
    props[prop] = { type: String, enum: keys(cond) };
  }

  if (prop && isArray(enums)) {
    props[prop] = { type: String, enum: enums };
  }

  return props;
}, {});
