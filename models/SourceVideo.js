const mongoose = require('mongoose');
const connection = reqlib('./utils/mongodb-connection');
const transform = reqlib('./utils/schema/toJSON')();

const { Schema } = mongoose;

let schema = new Schema({
  sha1: String,
  alias: String,
  definition:{ type: String, enum: ['256p', '360p', '480p', '720p'] },
  duration: Number,
  cover: String
});

schema.options.toJSON = { transform };

module.exports = connection.model('SourceVideo', schema);
