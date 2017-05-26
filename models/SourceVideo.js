const mongoose = require('mongoose');
const url = require('url');
const connection = reqlib('./utils/mongodb-connection');
const transform = reqlib('./utils/schema/toJSON')();

const { Schema } = mongoose;

let schema = new Schema({
  sha1: { type: String, unique: true, index: true },
  // alias: String,
  // definition:{ type: String, enum: ['256p', '360p', '480p', '720p'] },
  filename: String,
  filepath: String,
  width: Number,
  height: Number,
  size: Number,
  duration: Number,
  cover: String,
  uploadAt: Date,
  createAt: { type: Date, default: Date.now }
});

schema.virtual('url').get(function() {
  return url.resolve(config.sourceVideo.host, this.filepath);
});

schema.options.toJSON = { transform };

module.exports = connection.model('SourceVideo', schema);
