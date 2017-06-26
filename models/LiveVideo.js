const mongoose = require('mongoose');

const connection = reqlib('./utils/mongodb-connection');
const toUrl = reqlib('./utils/toUrl');
const transform = reqlib('./utils/schema/toJSON');

const { Schema } = mongoose;
const { ObjectId } = Schema;

let schema = new Schema({
  sourceId: ObjectId,
  tags: [{ type: String, maxlength: 6 }],
  keywords: [{ type: String, minlength: 1 , maxlength: 6 }],
  name: { type: String, minlength: 1, maxLength: 64, default: '' },
  abstract: { type: String, minlength: 1, maxLength: 128, default: '' },
  summary: { type: String, minlength: 1, maxLength: 65535, default: '' },
  cover: { type: String, default: null },
  views: { type: Number, default: 0 },
  publishAt: { type: Date, default: null },
  recommendBeginAt: { type: Date, default: null },
  recommendEndAt: { type: Date, default: null },
  createAt: { type: Date, default: Date.now },
  removeAt: { type: Date, default: null }
});

schema.virtual('coverUrl').get(function() {
  return toUrl(this.cover);
});

schema.options.toJSON = { transform: transform() };

module.exports = connection.model('LiveVideo', schema);
