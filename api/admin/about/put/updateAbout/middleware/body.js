const mongoose = require('mongoose');

const genValidator = require('utils/schema/model/genValidator');
const genMiddleware = require('utils/router/genMiddleware');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const schema = new Schema({
  name: { type: String, minlength: 1, maxLength: 64 },
  value: { type: String, maxlength: 512 },
  priority: Number
}, { _id: false });

module.exports = genMiddleware(genValidator(schema), 'body');
