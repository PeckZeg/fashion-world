const mongoose = require('mongoose');

const genSearchParams = reqlib('./utils/validate-models/search-params');
const genSortParams = reqlib('./utils/validate-models/sort-params');
const validate = reqlib('./validate-models/validate');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const { SEARCH_PROPS, SORT_PROPS, VALIDATOR_PROPS } = require('./props');

const schema = new Schema({
  offset: { type: Number, min: 0, default: 0 },
  limit: { type: Number, min: 0, default: 20 },
  videoId: ObjectId,
  channelId: ObjectId,
  categoryId: ObjectId,
  ...VALIDATOR_PROPS,
  ...genSortParams(SORT_PROPS),
  ...genSearchParams(SEARCH_PROPS)
}, { _id: false });

module.exports = validate(
  mongoose.model('AdminFetchLoopVideoListQueryParams', schema)
);
