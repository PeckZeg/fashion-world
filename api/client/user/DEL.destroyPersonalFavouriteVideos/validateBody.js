const mongoose = require('mongoose');
const validate = reqlib('./validate-models/validate');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const schema = new Schema({
  videoIds: [ObjectId]
}, { _id: false });

module.exports = validate(
  mongoose.model('ClientDestroyUserPersonalFavouriteVideos', schema)
);
