const mongoose = require('mongoose');
const CaaError = reqlib('./utils/CaaError');

const validate = reqlib('./validate-models/validate');

let schema = new mongoose.Schema({
  mobile: { type: String, required: true, match: /^\d{11}$/ },
  code: { type: String, required: true, match: /^\d{6}$/i }
}, { _id: false });

let Params = mongoose.model('UserValidateResetCodeParams', schema);

module.exports = validate(Params);
