const reduceQueryProps = reqlib('./utils/api-model/reduceQueryProps');
const reduceTransProps = reqlib('./utils/api-model/reduceTransProps');
const reduceValidatorProps = reqlib('./utils/api-model/reduceValidatorProps');

// 属性转换
const PROPS = {
  publishAt: {
    query: { type: Boolean, prop: 'isPublished' },
    validator: Boolean
  },

  removeAt: {
    query: { type: Boolean, prop: 'isRemoved' },
    validator: Boolean
  }
};

// 查询属性
exports.SEARCH_PROPS = [
  'title'
];

// 查询条件
exports.COND_PROPS = [
  ['bannerId', '_id'],
  'type',
  'channelId',
  'categoryId'
];

// 排序参数
exports.SORT_PROPS = [
  'priority',
  'publishAt',
  'createAt',
  'removeAt'
];

exports.QUERY_PROPS = reduceQueryProps(PROPS);
exports.TRANS_PROPS = reduceTransProps(PROPS);
exports.VALIDATOR_PROPS = reduceValidatorProps(PROPS);
