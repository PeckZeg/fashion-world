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
  ['loopVideoId', '_id'],
  'videoId'
];

// 排序参数
exports.SORT_PROPS = [
  'priority',
  'publishAt',
  'createAt',
  'removeAt'
];

// 查询字符串参数
exports.QUERY_PROPS = reduceQueryProps(PROPS);

// 查询字符串转换参数
exports.TRANS_PROPS = reduceTransProps(PROPS);

// 验证器参数
exports.VALIDATOR_PROPS = reduceValidatorProps(PROPS);
