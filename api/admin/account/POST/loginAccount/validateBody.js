const mongoose = require('mongoose');
const validate = reqlib('./validate-models/validate');

const { Schema } = mongoose;

const schema = new Schema({
  name: { type: String, required: true, minlength: 3, maxLength: 15 },
  password: { type: String, required: true, match: /^[a-f0-9]{32}$/i }
}, { _id: false });

module.exports = validate(
  mongoose.model('AdminLoginAccountBodyParams', schema)
);
