const mongoose = require('mongoose');

const genValidator = require('utils/schema/model/genValidator');
const genMiddleware = require('utils/router/genMiddleware');

const { Schema } = mongoose;
const { ObjectId, Mixed } = Schema.Types;

const schema = new Schema({
  key: { type: String, required: true }
}, { _id: false });

module.exports = genMiddleware(genValidator(schema), 'body');
