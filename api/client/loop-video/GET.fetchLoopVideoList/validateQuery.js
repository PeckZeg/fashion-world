const mongoose = require('mongoose');
const CaaError = reqlib('./utils/CaaError');

const validate = reqlib('./validate-models/validate');

const schema = new mongoose.Schema({
  offset: { type: Number, min: 0, default: 0 },
  limit: { type: Number, min: 0, default: 20 }
}, { _id: false });

module.exports = validate(
  mongoose.model('ClientFetchLoopVideoListQueryParams', schema)
);
