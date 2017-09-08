const reduceQueryProps = reqlib('./utils/api-model/reduceQueryProps');
const reduceTransProps = reqlib('./utils/api-model/reduceTransProps');

const PROPS = {
  activeAt: {
    query: { type: Boolean, prop: 'isActive' }
  },

  removeAt: {
    query: { type: Boolean, prop: 'isRemoved' }
  }
};


exports.SEARCH_PROPS = [
  'name'
];

exports.SORT_PROPS = Object.keys(PROPS);
exports.QUERY_PROPS = reduceQueryProps(PROPS);
exports.TRANS_PROPS = reduceTransProps(PROPS);
