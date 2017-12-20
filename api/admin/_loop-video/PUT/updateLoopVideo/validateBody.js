const mongoose = require('mongoose');
const validate = reqlib('./validate-models/validate');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;


const schema = new Schema({
  videoId: ObjectId,
  title: { type: String, minlength: 1, maxLength: 65535 },
  subtitle: { type: String, maxLength: 65535 },
  abstract: { type: String, minlength: 1, maxLength: 65535 },
  summary: { type: String, minlength: 1, maxLength: 65535 },
  priority: Number,
}, { _id: false });

module.exports = validate(
  mongoose.model('AdminUpdateLoopVideoBodyParams', schema)
);
