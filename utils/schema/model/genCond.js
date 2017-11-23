const isPlainObject = require('lodash/isPlainObject');
const isUndefined = require('lodash/isUndefined');
const isFunction = require('lodash/isFunction');
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
  const { prop, shape, transTo, search, cond } = schema;

  if (prop && has(body, prop) && shape) {
    props[transTo ? transTo : prop] = body[prop];
  }

  if (prop && has(body, prop) && isPlainObject(cond)) {
    const value = cond[body[prop]];

    if (!isUndefined(value)) {
      props[prop] = isFunction(value) ? value() : value;
    }
  }

  const searchProp = camelCase(`search-${prop}`);

  if (search && has(body, searchProp)) {
    props[prop] = {
      $regex: new RegExp(body[searchProp], 'i')
    };
  }

  return props;
}, {});
