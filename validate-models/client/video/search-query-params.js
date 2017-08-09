const mongoose = require('mongoose');
const validate = reqlib('./validate-models/validate');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const schema = new mongoose.Schema({
  offset: { type: Number, min: 0, default: 0 },
  limit: { type: Number, min: 0, default: 20 },
  title: { type: String, required: true },
  channelId: ObjectId,
  categoryId: ObjectId
}, { _id: false });

module.exports = validate(
  mongoose.model('ClientSearchVideoQueryParams', schema)
);
