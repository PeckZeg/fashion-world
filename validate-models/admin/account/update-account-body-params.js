const mongoose = require('mongoose');
const validate = reqlib('./validate-models/validate');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const schema = new Schema({
  name: { type: String, minlength: 3, maxLength: 32 },
  password: { type: String, match: [/^[a-f0-9]{32}$/i, 'invalid password `{VALUE}`'] },
  avatar: String,
  permissions: [String],
  activeAt: Date,
  removeAt: Date
}, { _id: false });

module.exports = validate(
  mongoose.model('AdminUpdateAccountBodyParams', schema)
);
