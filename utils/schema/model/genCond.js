const camelCase = require('lodash/camelCase');
const reduce = require('lodash/reduce');
const has = require('lodash/has');

/**
 *  生成查询条件
 *  @param {object} body
 *  @param {object[]} props
 *  @returns {object} 查询条件字典
 */
module.exports = (body, props) => reduce(props, (props, schema) => {
  const { prop, shape, transTo, search } = schema;

  if (prop && shape && has(body, prop)) {
    props[transTo ? transTo : prop] = body[prop];
  }

  const bodyProp = camelCase(`search-${prop}`);

  if (search && has(body, bodyProp)) {
    props[prop] = {
      $regex: new RegExp(body[bodyProp], 'i')
    };
  }

  return props;
}, {});
