const mongoose = require('mongoose');
const CaaError = reqlib('./utils/CaaError');

const validate = reqlib('./validate-models/validate');

let schema = new mongoose.Schema({
  offset: { type: Number, min: 0, default: 0 },
  limit: { type: Number, min: 0, default: 20 },
  isRemoved: Boolean,
  isPublished: Boolean
}, { _id: false });

let Params = mongoose.model('AdminVideoChannelCategoryListQueryParams', schema);

module.exports = validate(Params);