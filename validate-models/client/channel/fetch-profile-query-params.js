const mongoose = require('mongoose');
const validate = reqlib('./validate-models/validate');

const { Schema } = mongoose;

const schema = new Schema({
  injectCategories: Boolean
}, { _id: false });

module.exports = validate(
  mongoose.model('ClientFetchChannelProfileQueryParams', schema)
);
