const mongoose = require('mongoose');
const validate = reqlib('./validate-models/validate');

const { Schema } = mongoose;
const { ObjectId, Mixed } = Schema.Types;

const schema = new Schema({
  channelId: ObjectId,
  title: { type: String, minlength: 2, maxlength: 64 },
  type: { type: String, minlength: 2, maxlength: 64 },
  value: Mixed,
  priority: Number,
  publishAt: Date,
  removeAt: Date
}, { _id: false });

module.exports = validate(
  mongoose.model('AdminUpdateBannerBodyParams', schema),
  null,
  true
);
