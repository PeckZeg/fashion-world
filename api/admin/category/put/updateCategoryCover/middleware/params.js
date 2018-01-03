const mongoose = require('mongoose');

const genValidator = require('utils/schema/model/genValidator');
const genMiddleware = require('utils/router/genMiddleware');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const schema = new Schema({
  categoryId: { type: ObjectId, required: true },
}, { _id: false });

module.exports = genMiddleware(genValidator(schema), 'params');
