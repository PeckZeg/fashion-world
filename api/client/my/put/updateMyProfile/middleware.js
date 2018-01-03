const mongoose = require('mongoose');

const genValidator = require('utils/schema/model/genValidator');
const genMiddleware = require('utils/router/genMiddleware');
const { GENDERS } = require('models/User/genders');

const { Schema } = mongoose;

const schema = new Schema({
  name: { type: String, minlength: 3, maxLength: 16 },
  gender: { type: String, enum: GENDERS }
});

module.exports = genMiddleware(genValidator(schema, 'client'), 'body');
