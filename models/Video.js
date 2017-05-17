const mongoose = require('mongoose');
const connection = reqlib('./utils/mongodb-connection');
const transform = reqlib('./utils/schema/toJSON')();

const { Schema, Types } = mongoose;
const { ObjectId } = Types;

let schema = new Schema({
  sourceVideoId: ObjectId,
  channel: String,
  category: String,
  tags: [String],
  name: String,
  summary: String,
  cover: String,
  isActive: { type: Boolean, default: true },
  isRecommend: { type: Boolean, default: false },
  isRemoved: { type: Boolean, default: false },
  publishAt: Date,
  createAt: { type: Date, default: Date.now },
  removeAt: Date
});

schema.options.toJSON = { transform };

module.exports = connection.model('Video', schema);
