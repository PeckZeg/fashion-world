const mongoose = require('mongoose');

const genMiddleware = require('utils/router/genMiddleware');
const genParams = require('utils/schema/genParams');
const validate = require('utils/request/validate');

const { ObjectId } = mongoose.Schema.Types;

const schema = new mongoose.Schema({
  accountId: { type: ObjectId, required: true }
}, { _id: false });

const validator = validate(
  mongoose.model('AdminActiveAccountParams', schema)
);

module.exports = genMiddleware(validator, 'params');
