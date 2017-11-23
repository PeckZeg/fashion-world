const { ObjectId } = require('mongoose').Types;

/**
 *  转换 ObjectId
 *  @param {*} id 待转换的编号
 *  @param {string} [prop = 'ObjectId'] 错误提示属性
 *  @returns {ObjectId}
 */
module.exports = (id, prop) => {
  if (!ObjectId.isValid(id)) {
    throw new ResponseError(400, `invalid ${prop || 'ObjectId'}`);
  }

  return ObjectId(id);
};
