const validate = require('utils/request/validate');
const uniqueId = require('lodash/uniqueId');
const mongoose = require('mongoose');

/**
 *  生成验证器
 *  @param {Schema} schema
 *  @param {string} [name = 'Admin']
 *  @returns {Function}
 */
module.exports = (schema, name = 'Admin') => validate(
  mongoose.model(uniqueId(name), schema)
);
