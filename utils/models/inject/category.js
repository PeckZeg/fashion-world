const isFunction = require('lodash/isFunction');
const isString = require('lodash/isString');
const isArray = require('lodash/isArray');
const has = require('lodash/has');
const map = require('lodash/map');

const injectChannel = require('utils/models/injectChannel');

const Channel = require('models/Channel');

/**
 *  往分类列表中注入额外的属性
 *  @param {object[]} categories 分类列表
 *  @param {object} [opts] 配置项
 *  @param {string} [opts.handler = 'toJSON'] 转换器
 *  @returns {object[]} 注入后的分类列表
 */
module.exports = async (categories, opts = {}) => {
  const { handler = 'toJSON' } = opts;
  const isOutputArray = isArray(categories);

  categories = isArray(categories) ? categories : [categories];

  if (isString(handler)) {
    categories = map(categories, category => {
      return isFunction(category[handler]) ? category[handler]() : category;
    });
  }

  categories = await injectChannel(categories, opts);

  return isOutputArray ? categories : categories[0];
};
