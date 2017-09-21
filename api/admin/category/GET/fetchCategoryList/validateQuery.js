const mongoose = require('mongoose');
const validate = reqlib('./validate-models/validate');
const genSortParams = reqlib('./utils/validate-models/sort-params');
const genSearchParams = reqlib('./utils/validate-models/search-params');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const { SEARCH_PROPS, SORT_PROPS, VALIDATOR_PROPS } = require('./props');

const schema = new Schema({
  offset: { type: Number, min: 0, default: 0 },
  limit: { type: Number, min: 0, default: 20 },
  channelId: ObjectId,
  ...VALIDATOR_PROPS,
  ...genSortParams(SORT_PROPS),
  ...genSearchParams(SEARCH_PROPS)
}, { _id: false });

module.exports = validate(
  mongoose.model('AdminFetchChannelListQueryParams', schema)
);
