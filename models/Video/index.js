const mongoose = require('mongoose');

const connection = require('utils/mongodb-connection');
const unsetProps = require('utils/schema/unset-props');
const transform = require('utils/schema/transform');
const toObject = require('./toObject');
const toJSON = require('./toJSON');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const schema = new Schema({
  channelId: { type: ObjectId, required: true },
  categoryId: { type: ObjectId, required: true },
  cover: { type: String, default: null },
  title: { type: String, minlength: 1, maxLength: 65535, default: null },
  subtitle: { type: String, maxLength: 65535, default: null },
  abstract: { type: String, minlength: 1, maxLength: 65535, default: null },
  summary: { type: String, minlength: 1, maxLength: 65535, default: null },
  originalTitle: { type: String, minlength: 1, maxLength: 65535, default: null },
  season: { type: Number, default: null },
  episode: { type: Number, default: null },
  part: { type: Number, default: null },
  castings: [String],
  year: { type: Number, default: null },
  rightsOwner: { type: String, default: null },
  productionCountry: { type: String, default: null },
  originalLanguage: { type: String, default: null },
  views: { type: Number, default: 0 },
  tags: [String],
  keywords: [String],
  publishAt: { type: Date, default: null },
  recommendAt: { type: Date, default: null },
  createAt: { type: Date, default: Date.now },
  removeAt: { type: Date, default: null },
  screenshots: [String],
  duration: { type: Number, default: 0 },
  size: { type: Number, default: 0 },
  priority: { type: Number, default: 0 },
  definitions: [
    {
      definition: { type: String, default: null },
      key: { type: String, default: null }
    }
  ],

  /**
   *  @deprecated
   */
   source: { type: String, default: null },
   filepath: { type: String, default: null },
   sourceId: { type: ObjectId, required: true },
}, { toJSON, toObject });

module.exports = connection.model('Video', schema);
