const mongoose = require('mongoose');
const validate = reqlib('./validate-models/validate');

const { Schema } = mongoose;

const schema = new Schema({
  name: { type: String, minlength: 1, maxLength: 64 },
  priority: Number,
  publishAt: Date,
  removeAt: Date,
}, { _id: false });

module.exports = validate(
  mongoose.model('AdminUpdateChannelBodyParams', schema)
);
