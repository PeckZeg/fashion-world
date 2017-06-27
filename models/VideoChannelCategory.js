const mongoose = require('mongoose');
const connection = require('../utils/mongodb-connection');
const transform = reqlib('./utils/schema/toJSON')();

const { Schema } = mongoose;
const { ObjectId } = Schema;

let schema = new Schema({
  name: { type: String, required: true, minlength: 1, maxLength: 64 },
  channelId: { type: ObjectId, required: true },
  priority: { type: Number, default: 0 },
  // isActive: { type: Boolean, default: true },
  publishAt: { type: Date, default: null },
  createAt: { type: Date, default: Date.now },
});

schema.options.toJSON = { transform };

module.exports = connection.model('VideoChannelCategory', schema);
