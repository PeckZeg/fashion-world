const mongoose = require('mongoose');
const url = require('url');
const path = require('path');
const connection = reqlib('./utils/mongodb-connection');
const transform = reqlib('./utils/schema/toJSON')();

const { Schema } = mongoose;

let schema = new Schema({
  sha1: { type: String, unique: true, index: true },
  // alias: String,
  // definition:{ type: String, enum: ['256p', '360p', '480p', '720p'] },
  filename: { type: String, default: '' },
  filepath: { type: String, default: '' },
  width: { type: Number, default: 0 },
  height: { type: Number, default: 0 },
  size: { type: Number, default: 0 },
  duration: { type: Number, default: 0 },
  cover: { type: String, default: '' },
  uploadAt: { type: Date, default: null },
  screenshots: [String],
  createAt: { type: Date, default: Date.now }
});

schema.virtual('url').get(function() {
  return url.resolve(
    config.sourceVideo.hostname,
    path.join(config.sourceVideo.basePathname, this.filepath)
  );
});

schema.virtual('screenshotUrls').get(function() {
  return this.screenshots.map(screenshot => url.format({
    ...config.resource,
    pathname: screenshot
  }));
});

schema.options.toJSON = { transform };

module.exports = connection.model('SourceVideo', schema);
