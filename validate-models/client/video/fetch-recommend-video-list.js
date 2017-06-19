const mongoose = require('mongoose');
const validate = reqlib('./validate-models/validate');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

let schema = new Schema({
  limit: { type: Number, min: 0, default: 20 },
  channelId: ObjectId,
  categoryId: ObjectId,
}, { _id: false });

let Params = mongoose.model('RecommendVideoListQueryParams', schema);

module.exports = validate(Params);
