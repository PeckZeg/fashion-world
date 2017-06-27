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
  keywords: [String],
  name: { type: String, minlength: 1, maxLength: 64 },
  abstract: { type: String, minlength: 1, maxLength: 128 },
  summary: { type: String, minlength: 1, maxLength: 65535 },
  cover: { type: String, default: null },
  views: { type: Number, default: 0 },
  collections: { type: Number, default: 0 },
  // favorites: { type: Number, default: 0 },
  // isPublished: { type: Boolean, default: true },
  // isRecommend: { type: Boolean, default: false },
  // isRemoved: { type: Boolean, default: false },
  publishAt: { type: Date, default: null },
  recommendAt: { type: Date, default: null },
  createAt: { type: Date, default: Date.now },
  removeAt: { type: Date, default: null }
});

schema.virtual('coverUrl').get(function() {
  return this.cover ? url.format({ ...config.resource, pathname: this.cover }) : null;
});

schema.options.toJSON = { transform: transform() };

module.exports = connection.model('Video', schema);
