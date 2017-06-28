const mongoose = require('mongoose');
const validate = reqlib('./validate-models/validate');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

let schema = new Schema({
  // offset: { type: Number, min: 0, default: 0 },
  limit: { type: Number, default: 20 },
  // channelId: ObjectId,
  // type: String
}, { _id: false });

let Params = mongoose.model('LiveVideoListQueryParams', schema);

module.exports = validate(Params);
