const mongoose = require('mongoose');
const validate = reqlib('./validate-models/validate');

let schema = new mongoose.Schema({
  mobile: { type: String, required: true, match: /^\d{11}$/i },
  password: { type: String, required: true, match: /^[a-f0-9]{32}$/ }
}, { _id: false });

module.exports = validate(
  mongoose.model('ClientUserLoginParams', schema)
);
