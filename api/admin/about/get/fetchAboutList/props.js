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
    prop: 'name',
    search: true
  },
  {
    prop: 'value',
    search: true
  },
  {
    prop: 'priority',
    sort: true
  },
  {
    prop: 'createAt',
    sort: true
  },
  {
    prop: 'publishAt',
    sort: true,
    cond: {
      on: () => ({ $ne: null, $lte: new Date() }),
      timing: () => ({ $ne: null, $gte: new Date() }),
      off: () => ({ $eq: null })
    }
  },
  {
    prop: 'removeAt',
    sort: true,
    cond: {
      on: () => ({ $ne: null }),
      off: () => ({ $eq: null })
    }
  }
];
