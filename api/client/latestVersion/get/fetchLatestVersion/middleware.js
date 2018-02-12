const mongoose = require('mongoose');

const genValidator = require('utils/schema/model/genValidator');
const genMiddleware = require('utils/router/genMiddleware');
const matchVersion = require('utils/schema/match/version');
const types = require('models/Version/types');

const { Schema } = mongoose;

const schema = new Schema({
  type: { type: String, lowercase: true, enum: types, required: true },
  current: { type: String, match: matchVersion, required: true }
}, { _id: false });

module.exports = genMiddleware(genValidator(schema, 'client'));
