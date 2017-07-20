const mongoose = require('mongoose');

const connection = require('../utils/mongodb-connection');
const unsetProps = reqlib('./utils/schema/unset-props');
const transform = reqlib('./utils/schema/transform');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const TRANSFORM_TO_JSON_PROP_BLACK_LIST = [
  'id',
  'originalTitle',
  'removeAt'
];

const schema = new Schema({
  channelId: { type: ObjectId, required: true },
  categoryId: { type: ObjectId, required: true },
  title: { type: String, minlength: 1, maxLength: 65535 },
  subtitle: { type: String, maxLength: 65535 },
  abstract: { type: String, minlength: 1, maxLength: 128 },
  summary: { type: String, minlength: 1, maxLength: 65536 },
  id: String,
  originalTitle: String,
  season: Number,
  episode: Number,
  part: Number,
  castings: [String],
  year: Number,
  rightsOwner: String,
  productionCountry: String,
  originalLanguage: String,
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
