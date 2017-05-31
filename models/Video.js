const mongoose = require('mongoose');
const url = require('url');

const connection = reqlib('./utils/mongodb-connection');
const transform = reqlib('./utils/schema/toJSON');

const { Schema } = mongoose;
const { ObjectId } = Schema;

let schema = new Schema({
  sourceId: { type: ObjectId, required: true },
  channelId: { type: ObjectId, required: true },
  categoryId: { type: ObjectId, required: true },
  tags: [String],
  name: { type: String, minlength: 1, maxLength: 64 },
  abstract: { type: String, minlength: 1, maxLength: 128 },
  summary: { type: String, minlength: 1, maxLength: 65535 },
  cover: String,
  isActive: { type: Boolean, default: true },
  isRecommend: { type: Boolean, default: false },
  isRemoved: { type: Boolean, default: false },
  publishAt: Date,
  createAt: { type: Date, default: Date.now },
  removeAt: Date
});

schema.virtual('coverUrl').get(function() {
  return url.format({ ...config.resource, pathname: this.cover });
});


schema.options.toJSON = { transform: transform(ret => _.omit(ret, 'cover')) };

module.exports = connection.model('Video', schema);
