const mongoose = require('mongoose');

const genValidator = require('utils/schema/model/genValidator');
const genMiddleware = require('utils/router/genMiddleware');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const schema = new Schema({
  name: { type: String, required: true, minlength: 1, maxLength: 64 },
  priority: Number,
  publishAt: Date
}, { _id: false });

module.exports = genMiddleware(genValidator(schema), 'body');
