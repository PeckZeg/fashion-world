const mongoose = require('mongoose');

const genValidator = require('utils/schema/model/genValidator');
const matchPassword = require('utils/schema/match/password');
const genMiddleware = require('utils/router/genMiddleware');

const { Schema } = mongoose;

const schema = new Schema({
  name: { type: String, required: true, minlength: 3, maxLength: 15 },
  password: { type: String, required: true, match: matchPassword }
}, { _id: false });

module.exports = genMiddleware(genValidator(schema), 'body');
