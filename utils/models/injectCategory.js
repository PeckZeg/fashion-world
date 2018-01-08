const isFunction = require('lodash/isFunction');
const keyBy = require('lodash/keyBy');
const map = require('lodash/map');
const has = require('lodash/has');

const mapId = require('utils/models/mapId');

const Category = require('models/Category');

/**
 *  注入分类信息
 *  @param {Array} arr 需要注入的数组
 *  @param {object} [opts] 配置项
 *  @param {string} [opts.handler = 'toJSON']
 *  @returns {object[]} 模型数组
 */
module.exports = async (arr, opts = {}) => {
  const { handler = 'toJSON', Model } = opts;
  const _id = mapId(arr, 'categoryId');
  const categories = keyBy(await Category.find({ _id }), '_id');

  return map(arr, item => {
    const { categoryId } = item;
    let category = null;

    if (has(categories, categoryId)) {
      category = categories[categoryId];
      category = isFunction(category[handler]) ? category[handler]() : category;
    }

    return { ...item, category };
  });
};
