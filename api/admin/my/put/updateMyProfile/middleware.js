const mongoose = require('mongoose');

const genValidator = require('utils/schema/model/genValidator');
const matchPassword = require('utils/schema/match/password');
const genMiddleware = require('utils/router/genMiddleware');

const { Schema } = mongoose;
const { ObjectId, Mixed } = Schema.Types;

const schema = new Schema({
  name: { type: String, minlength: 3, maxLength: 32 },
  password: { type: String, match: matchPassword },
}, { _id: false });

module.exports = genMiddleware(genValidator(schema), 'body');
