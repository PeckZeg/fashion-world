const mongoose = require('mongoose');
const validate = reqlib('./validate-models/validate');
const genSortParams = reqlib('./utils/validate-models/sort-params');
const genSearchParams = reqlib('./utils/validate-models/search-params');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const SORT_PARAMS = ['priority', 'publishAt', 'recommendAt', 'createAt', 'removeAt'];
const SEARCH_PROPS = ['title'];

const schema = new Schema({
  offset: { type: Number, min: 0, default: 0 },
  limit: { type: Number, min: 0, default: 20 },
  channelId: ObjectId,
  categoryId: ObjectId,
  isPublished: Boolean,
  isRecommended: Boolean,
  isRemoved: Boolean,
  ...genSortParams(SORT_PARAMS),
  ...genSearchParams(SEARCH_PROPS)
}, { _id: false });

module.exports = validate(
  mongoose.model('AdminFetchVideoListQueryParams', schema)
);
