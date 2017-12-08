const mongoose = require('mongoose');

const matchPassword = reqlib('./utils/schema/match/password');
const validate = reqlib('./validate-models/validate');

const { Schema } = mongoose;

const schema = new Schema({
  name: { type: String, minlength: 3, maxLength: 32, required: true },
  password: { type: String, required: true, match: matchPassword },
  avatar: String,
  isActive: Boolean,
  permissions: [String]
}, { _id: false });

module.exports = validate(
  mongoose.model('AdminCreateAccountBodyParams', schema)
);