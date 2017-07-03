const mongoose = require('mongoose');
const validate = reqlib('./validate-models/validate');

const schema = new mongoose.Schema({
  mobile: { type: String, required: true, match: /^\d{11}$/ },
}, { _id: false });

module.exports = validate(
  mongoose.model('ClientUserCreateVerifyCodeParams', schema)
);
