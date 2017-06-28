const mongoose = require('mongoose');
const validate = reqlib('./validate-models/validate');

const { Schema } = mongoose;

const schema = new Schema({
  offset: { type: Number, min: 0, default: 0 },
  limit: { type: Number, min: 0, default: 20 },
}, { _id: false });

const Params = mongoose.model('VideoFavouriteUserListQueryParams', schema);

module.exports = validate(Params);
