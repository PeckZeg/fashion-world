const mongoose = require('mongoose');

const genValidator = require('utils/schema/model/genValidator');
const genMiddleware = require('utils/router/genMiddleware');
const matchUrl = require('utils/schema/match/url');

const { Schema } = mongoose;
const { Mixed, ObjectId } = Schema.Types;
const { TYPES } = require('models/Banner/types');

const schema = new Schema({
  title: { type: String, maxlength: 32 },
  description: { type: String, maxlength: 1024 },
  link: { type: String, match: matchUrl },
}, { _id: false });

module.exports = genMiddleware(genValidator(schema), 'body');
