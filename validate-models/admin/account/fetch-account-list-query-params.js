const mongoose = require('mongoose');
const validate = reqlib('./validate-models/validate');
const genSortParams = reqlib('./utils/validate-models/sort-params');
const genSearchParams = reqlib('./utils/validate-models/search-params');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const SORT_PARAMS = ['activeAt', 'removeAt'];
const SEARCH_PROPS = ['name'];

const schema = new Schema({
  offset: { type: Number, min: 0, default: 0 },
  limit: { type: Number, min: 0, default: 20 },
  isActive: Boolean,
  isRemoved: Boolean,
  ...genSortParams(SORT_PARAMS),
  ...genSearchParams(SEARCH_PROPS)
}, { _id: false });

module.exports = validate(
  mongoose.model('AdminFetchAccountListQueryParams', schema)
);
