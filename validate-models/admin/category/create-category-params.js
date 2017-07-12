const mongoose = require('mongoose');
const validate = reqlib('./validate-models/validate');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const schema = new Schema({
  channelId: { type: ObjectId, required: true },
  name: { type: String, required: true, minlength: 1, maxLength: 64 },
  priority: Number,
  publishAt: Date
}, { _id: false });

module.exports = validate(
  mongoose.model('AdminCreateCategoryBodyParams', schema)
);
