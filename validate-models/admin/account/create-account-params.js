const mongoose = require('mongoose');
const validate = reqlib('./validate-models/validate');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const schema = new Schema({
  name: { type: String, minlength: 3, maxLength: 32, required: true },
  password: { type: String, required: true, match: [/^[a-f0-9]{32}$/i, 'invalid password `{VALUE}`'] },
  avatar: String,
  isActive: Boolean,
  permissions: [String]
}, { _id: false });

module.exports = validate(
  mongoose.model('AdminCreateAccountBodyParams', schema)
);
