const mongoose = require('mongoose');
const url = require('url');
const path = require('path');
const connection = reqlib('./utils/mongodb-connection');
const transform = reqlib('./utils/schema/toJSON')();

const { Schema } = mongoose;
const { Mixed, ObjectId } = Schema.Types;

let schema = new Schema({
  channelId: { type: ObjectId, default: null }
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
