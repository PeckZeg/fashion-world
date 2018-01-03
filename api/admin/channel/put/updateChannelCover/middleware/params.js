const mongoose = require('mongoose');

const genValidator = require('utils/schema/model/genValidator');
const genMiddleware = require('utils/router/genMiddleware');

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema.Types;

const schema = new mongoose.Schema({
  channelId: { type: ObjectId, required: true },
}, { _id: false });

module.exports = genMiddleware(genValidator(schema), 'params');
