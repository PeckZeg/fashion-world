const mongoose = require('mongoose');

const genValidator = require('utils/schema/model/genValidator');
const genMiddleware = require('utils/router/genMiddleware');

const { ObjectId } = mongoose.Schema.Types;

const schema = new mongoose.Schema({
  aboutId: { type: ObjectId, required: true },
}, { _id: false });

module.exports = genMiddleware(genValidator(schema), 'params');
