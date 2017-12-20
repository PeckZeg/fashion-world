const mongoose = require('mongoose');
const validate = reqlib('./validate-models/validate');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const schema = new Schema({
  channelId: ObjectId,
  categoryId: ObjectId,
  cover: String,
  title: { type: String, minlength: 1, maxLength: 65535 },
  subtitle: { type: String, maxLength: 65535 },
  abstract: { type: String, minlength: 1, maxLength: 65535 },
  summary: { type: String, minlength: 1, maxLength: 65535 },
  originalTitle: { type: String, minlength: 1, maxLength: 65535 },
  season: Number,
  episode: Number,
  part: Number,
  castings: [String],
  year: Number,
  rightsOwner: String,
  productionCountry: String,
  originalLanguage: String,
  tags: [String],
  keywords: [String],
  publishAt: Date,
  recommendAt: Date,
  removeAt: Date
}, { _id: false });

const validator = validate(
  mongoose.model('AdminUpdateVideoBodyParams', schema)
);

module.exports = (...args) => validator(...args).then(body => {
  _.forEach(['keywords', 'tags', 'castings'], key => {
    if (!body[key].length) {
      delete body[key];
    }
  });

  return body;
});
