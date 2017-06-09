const mongoose = require('mongoose');
const CaaError = reqlib('./utils/CaaError');

const validate = reqlib('./validate-models/validate');

let schema = new mongoose.Schema({
  name: { type: String, minlength: 3, maxLength: 32, required: true },
  password: { type: String, required: true, match: [/^[a-f0-9]{32}$/i, 'password `{VALUE}` should be a md5 string'] },
  avatar: String,
  isActive: Boolean,
  permissions: [String]
}, { _id: false });

let Params = mongoose.model('AdminAccountCreateParams', schema);

module.exports = validate(Params);
