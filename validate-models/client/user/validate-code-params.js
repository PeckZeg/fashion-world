const mongoose = require('mongoose');
const validate = reqlib('./validate-models/validate');

const schema = new mongoose.Schema({
  mobile: { type: String, required: true, match: /^\d{11}$/ },
  code: { type: String, required: true, match: /^\d{6}$/ }
}, { _id: false });


module.exports = validate(
  mongoose.model('ClientUserValidateCodeParams', schema)
);
