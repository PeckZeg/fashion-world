const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

const { GENDERS } = require('models/User/genders');

/**
 *  概要属性列表
 *  @property {string} prop 属性列表
 *  @property {*} [shape] 描述该属性的形态
 *  @property {string} transTo 该属性在传递给处理器时属性名将转换成该值
 *  @property {boolean} sort 该属性是否转换为可排序属性，`name` -> `sortName`
 *  @property {boolean} search 该属性是否转换为可搜索属性，`name` -> `searchName`
 *  @property {object} cond 该属性是否指定枚举值
 */
module.exports = [
  {
    prop: 'userId',
    shape: ObjectId,
    transTo: '_id',
  },
  {
    prop: 'mobile',
    shape: String
  },
  {
    prop: 'name',
    search: true
  },
  {
    prop: 'gender',
    enums: GENDERS
  },
  {
    prop: 'createAt',
    sort: true
  },
  {
    prop: 'registerAt',
    sort: true
  }
];
