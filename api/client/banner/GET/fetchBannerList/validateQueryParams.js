const mongoose = require('mongoose');
const validate = reqlib('./validate-models/validate');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const schema = new Schema({
  offset: { type: Number, min: 0, default: 0 },
  limit: { type: Number, min: 0, default: 20 },
  channelId: ObjectId,
  categoryId: ObjectId,
  type: String
}, { _id: false });

module.exports = validate(
  mongoose.model('ClientFetchBannerListQueryParams', schema)
);
