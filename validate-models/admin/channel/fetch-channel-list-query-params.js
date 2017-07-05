const mongoose = require('mongoose');
const validate = reqlib('./validate-models/validate');

const { Schema } = mongoose;

const schema = new Schema({
  offset: { type: Number, min: 0, default: 0 },
  limit: { type: Number, min: 0, default: 20 },
  isPublished: Boolean,
  isRemoved: Boolean
}, { _id: false });

module.exports = validate(
  mongoose.model('AdminFetchChannelListQueryParams', schema)
);
