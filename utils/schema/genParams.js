const camelCase = require('lodash/camelCase');
const reduce = require('lodash/reduce');

/**
 *  生成概要列表
 *  @param {object[]} props 属性表
 *  @returns {object} 生成概要列表
 */
module.exports = props => reduce(props, (props, { prop, shape }) => {
  if (prop && shape) {
    props[prop] = shape;
  }

  return props;
}, {});
