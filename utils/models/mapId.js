const { ObjectId } = require('mongoose').Types;

/**
 *  映射出 `ObjectId`
 *  @param {Array} arr 待映射的列表
 *  @param {string} [prop = '_id'] 需要映射的属性
 *  @returns {ObjectId[]} 编号列表
 */
module.exports = (arr, prop = '_id') => _.chain(arr)
  .map(prop)
  .invokeMap('toString')
  .compact()
  .uniq()
  .map(id => ObjectId(id))
  .value();
