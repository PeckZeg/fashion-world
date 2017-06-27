const mongoose = require('mongoose');
const validate = reqlib('./validate-models/validate');

const { Schema } = mongoose;
const { ObjectId } = Schema;

let schema = new mongoose.Schema({
  offset: { type: Number, min: 0, default: 0 },
  limit: { type: Number, min: 0, default: 20 },
  isRecommend: Boolean,
  categoryId: ObjectId,
  channelId: ObjectId,
  tags: [String],
  sourceId: [ObjectId]
}, { _id: false });

let Params = mongoose.model('VideoListQueryParams', schema);

module.exports = validate(Params);
