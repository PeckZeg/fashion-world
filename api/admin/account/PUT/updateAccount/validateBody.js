const mongoose = require('mongoose');

const matchPassword = reqlib('./utils/schema/match/password');
const validate = reqlib('./validate-models/validate');

const { Schema } = mongoose;

const schema = new Schema({
  name: { type: String, minlength: 3, maxLength: 32 },
  password: { type: String, match: matchPassword },
  avatar: String,
  permissions: [String],
  activeAt: Date,
  removeAt: Date
}, { _id: false });

module.exports = validate(
  mongoose.model('AdminUpdateAccountBodyParams', schema)
);
