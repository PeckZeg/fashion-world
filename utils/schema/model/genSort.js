const camelCase = require('lodash/camelCase');
const reduce = require('lodash/reduce');
const has = require('lodash/has');

/**
 *  生成搜索条件
 *  @param {object} body
 *  @param {object[]} props
 *  @returns {object} 搜索条件字典
 */
module.exports = (body, props) => reduce(props, (props, { prop, sort }) => {
  const bodyProp = camelCase(`sort-${prop}`)

  if (sort && has(body, bodyProp)) {
    props[prop] = body[bodyProp];
  }

  return props;
}, { createAt: -1 });
