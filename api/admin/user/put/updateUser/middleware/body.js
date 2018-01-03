const mongoose = require('mongoose');

const genValidator = require('utils/schema/model/genValidator');
const genMiddleware = require('utils/router/genMiddleware');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;
const { GENDERS } = require('models/User/genders');

const schema = new Schema({
  name: { type: String, minlength: 3, maxLength: 24 },
  gender: { type: String, enum: GENDERS },
}, { _id: false });

module.exports = genMiddleware(genValidator(schema), 'body');
