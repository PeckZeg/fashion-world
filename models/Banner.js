const mongoose = require('mongoose');
const url = require('url');
const path = require('path');
const connection = reqlib('./utils/mongodb-connection');
const transform = reqlib('./utils/schema/toJSON')();

const { Schema } = mongoose;
const { Mixed, ObjectId } = Schema.Types;

let schema = new Schema({
  channelId: { type: ObjectId, default: null },
  title: { type: String, required: true, minlength: 2, maxlength: 64, default: '' },
  type: { type: String, required: true, minlength: 2, maxlength: 64, default: 'url' },
  value: { type: Mixed, required: true, default: '' },
  cover: { type: String, default: null },
  priority: { type: Number, default: 0 },
  createAt: { type: Date, default: Date.now },
  removeAt: { type: Date, default: null }
});

schema.virtual('coverUrl').get(function() {
  return this.cover ? url.format({
    ...config.resource,
    pathname: this.cover
  }) : null;
});

schema.options.toJSON = { transform };

module.exports = connection.model('Banner', schema);
