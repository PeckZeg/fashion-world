const reduceQueryProps = reqlib('./utils/api-model/reduceQueryProps');
const reduceTransProps = reqlib('./utils/api-model/reduceTransProps');
const reduceValidatorProps = reqlib('./utils/api-model/reduceValidatorProps');

const PROPS = {
  registerAt: {
    query: { type: Boolean, prop: 'isRegistered' },
    validator: Boolean
  }
};

exports.SEARCH_PROPS = [
  'name'
];

exports.COND_PROPS = [
  ['userId', '_id']
];

exports.SORT_PROPS = Object.keys(PROPS);
exports.QUERY_PROPS = reduceQueryProps(PROPS);
exports.TRANS_PROPS = reduceTransProps(PROPS);
exports.VALIDATOR_PROPS = reduceValidatorProps(PROPS);
