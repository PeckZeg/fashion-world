const mongoose = require('mongoose');
const url = require('url');
const path = require('path');
const connection = reqlib('./utils/mongodb-connection');
const transform = reqlib('./utils/schema/toJSON')();

const { Schema } = mongoose;
const { Mixed } = Schema.Types;

let schema = new Schema({
  // sha1: { type: String, unique: true, index: true },
  // alias: String,
  // definition:{ type: String, enum: ['256p', '360p', '480p', '720p'] },
  // filename: { type: String, default: '' },
  // filepath: { type: String, default: '' },
  // width: { type: Number, default: 0 },
  // height: { type: Number, default: 0 },
  // size: { type: Number, default: 0 },
  // duration: { type: Number, default: 0 },
  // cover: { type: String, default: '' },
  // uploadAt: { type: Date, default: null },
  // screenshots: [String],
  title: { type: String, required: true, default: '' },
  type: { type: String, required: true, default: 'url' },
  value: { type: Mixed, required: true, default: '' },
  cover: { type: String, default: '' },
  createAt: { type: Date, default: Date.now }
});

schema.virtual('url').get(function() {
  return url.resolve(
    config.sourceVideo.hostname,
    path.join(config.sourceVideo.basePathname, this.filepath)
  );
});

schema.options.toJSON = { transform };

module.exports = connection.model('Banner', schema);
