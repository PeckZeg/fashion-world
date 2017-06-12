const mongoose = require('mongoose');
const caaError = reqlib('./utils/CaaError');
const validate = reqlib('./validate-models/validate');

const { Schema } = mongoose;
const { ObjectId } = Schema;

let schema = new Schema({
  sourceId: ObjectId,
  channelId: ObjectId,
  categoryId: ObjectId,
  tags: [String],
  name: { type: String, minlength: 1, maxLength: 64 },
  abstract: { type: String, minlength: 1, maxLength: 128 },
  summary: { type: String, minlength: 1, maxLength: 65535 },
  cover: String,
  views: Number,
  collections: Number,
  isPublished: Boolean,
  isRecommend: Boolean,
  isRemoved: Boolean,
  publishAt: Date,
  removeAt: Date,
  recommendAt: Date,
}, { _id: false });

let Params = mongoose.model('AdminUpdateVideoParams', schema);

schema.options.toJSON = {
  transform(doc, ret) {
    if (!ret.tags.length) {
      delete ret.tags;
    }

    return ret;
  }
};

module.exports = validate(Params, (doc, ret, body) => {
  if (_.has(body, 'tags') && !body.tags.length) {
    ret.tags = [];
  }

  return ret;
});
