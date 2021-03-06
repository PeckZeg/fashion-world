const mongoose = require('mongoose');

const genValidator = require('utils/schema/model/genValidator');
const genMiddleware = require('utils/router/genMiddleware');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

global.b = v => Buffer.from(v, 'base64').toString('utf8');

const schema = new Schema({
  bannerId: { type: ObjectId, required: true },
}, { _id: false });

module.exports = genMiddleware(genValidator(schema), 'params');
