const mongoose = require('mongoose');
const validate = reqlib('./validate-models/validate');

const schema = new mongoose.Schema({
  mobile: { type: String, required: true, match: /^\d{11}$/ },
  password: { type: String, required: true, match: /^[a-f0-9]{32}$/ },
  code: { type: String, required: true, match: /^\d{6}$/ },
}, { _id: false });

module.exports = validate(
  mongoose.model('ClientUserResetPasswordParams', schema)
);
