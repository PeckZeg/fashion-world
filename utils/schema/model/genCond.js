const isPlainObject = require('lodash/isPlainObject');
const isUndefined = require('lodash/isUndefined');
const isFunction = require('lodash/isFunction');
const camelCase = require('lodash/camelCase');
const includes = require('lodash/includes');
const isArray = require('lodash/isArray');
const reduce = require('lodash/reduce');
const has = require('lodash/has');

/**
 *  生成查询条件
 *  @param {object} body
 *  @param {object[]} props
 *  @returns {object} 查询条件字典
 */
module.exports = (body, props) => reduce(props, (props, schema) => {
  const { prop, shape, transTo, search, cond, enums } = schema;
  const hasProp = prop && has(body, prop);

  if (hasProp && shape) {
    props[transTo ? transTo : prop] = body[prop];
  }

  if (hasProp && isPlainObject(cond)) {
    const value = cond[body[prop]];

    if (!isUndefined(value)) {
      props[prop] = isFunction(value) ? value() : value;
    }
  }

  if (hasProp && isArray(enums)) {
    const value = body[prop];

    if (!isUndefined(value) && includes(enums, value)) {
      props[prop] = value;
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
