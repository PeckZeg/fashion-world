const mongoose = require('mongoose');
const validate = reqlib('./validate-models/validate');
const genSortParams = reqlib('./utils/validate-models/sort-params');
const genSearchParams = reqlib('./utils/validate-models/search-params');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const SORT_PROPS = require('./SORT_PROPS.json');
const SEARCH_PROPS = require('./SEARCH_PROPS.json');

const schema = new Schema({
  offset: { type: Number, min: 0, default: 0 },
  limit: { type: Number, min: 0, default: 20 },
  videoId: ObjectId,
  isPublished: Boolean,
  isRemoved: Boolean,
  ...genSortParams(SORT_PROPS),
  ...genSearchParams(SEARCH_PROPS)
}, { _id: false });

module.exports = validate(
  mongoose.model('AdminFetchLoopVideoListQueryParams', schema)
);
