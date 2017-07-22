const mongoose = require('mongoose');

const connection = require('../utils/mongodb-connection');
const unsetProps = reqlib('./utils/schema/unset-props');
const transform = reqlib('./utils/schema/transform');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const TRANSFORM_TO_JSON_PROP_BLACK_LIST = [
  'originalTitle',
  'originalLanguage',
  'removeAt'
];

const schema = new Schema({
  channelId: { type: ObjectId, required: true },
  categoryId: { type: ObjectId, required: true },
  sourceId: { type: ObjectId, required: true },
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
  removeAt: { type: Date, default: null }
}, {
  toJSON: {
    virtuals: true,
    transform(doc, ret, options) {
      ret = transform(doc, ret, options);
      ret = unsetProps(ret, TRANSFORM_TO_JSON_PROP_BLACK_LIST);

      return ret;
    }
  },

  toObject: { virtuals: true, transform }
});

module.exports = connection.model('Video', schema);
