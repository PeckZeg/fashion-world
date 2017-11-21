const camelCase = require('lodash/camelCase');
const reduce = require('lodash/reduce');

/**
 *  生成排序参数列表
 *  @param {object[]} props 属性表
 *  @returns {object} 排序参数列表
 */
module.exports = props => reduce(props, (props, { prop, sort }) => {
  if (sort) {
    prop = camelCase(`sort-${prop}`);
    props[prop] = {
      type: Number,
      validate: {
        validator: v => /^(-1|1)$/.test(v + ''),
        message: `invalid ${prop}`
      }
    };
  }

  return props;
}, {});
