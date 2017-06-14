const mongoose = require('mongoose');
const CaaError = reqlib('./utils/CaaError');

const validate = reqlib('./validate-models/validate');

let schema = new mongoose.Schema({
  offset: { type: Number, min: 0, default: 0 },
  limit: { type: Number, min: 0, default: 20 },
  isRecommend: Boolean,
  isPublished: Boolean
}, { _id: false });

let Params = mongoose.model('AdminVideoListParams', schema);

module.exports = validate(Params);
