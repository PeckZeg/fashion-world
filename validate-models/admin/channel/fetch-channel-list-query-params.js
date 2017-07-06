const mongoose = require('mongoose');
const validate = reqlib('./validate-models/validate');
const genSortParams = reqlib('./utils/validate-models/sort-params');

const { Schema } = mongoose;

const SORT_PARAMS = ['priority', 'publishAt', 'removeAt'];

const schema = new Schema({
  offset: { type: Number, min: 0, default: 0 },
  limit: { type: Number, min: 0, default: 20 },
  ...genSortParams(SORT_PARAMS),
  isPublished: Boolean,
  isRemoved: Boolean
}, { _id: false });

module.exports = validate(
  mongoose.model('AdminFetchChannelListQueryParams', schema)
);
