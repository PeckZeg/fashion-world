const mongoose = require('mongoose');

const genValidator = require('utils/schema/model/genValidator');
const genMiddleware = require('utils/router/genMiddleware');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const schema = new Schema({
  channelId: ObjectId,
  categoryId: ObjectId,
  title: { type: String, minlength: 1, maxLength: 65535 },
  subtitle: { type: String, maxLength: 65535 },
  abstract: { type: String, minlength: 1, maxLength: 65535 },
  summary: { type: String, minlength: 1, maxLength: 65535 },
  originalTitle: { type: String, minlength: 1, maxLength: 65535 },
  season: Number,
  episode: Number,
  part: Number,
  castings: [String],
  year: Number,
  rightsOwner: String,
  productionCountry: String,
  originalLanguage: String,
  views: Number,
  priority: Number,
  tags: [String],
  keywords: [String]
}, { _id: false });

module.exports = genMiddleware(genValidator(schema), 'body');
