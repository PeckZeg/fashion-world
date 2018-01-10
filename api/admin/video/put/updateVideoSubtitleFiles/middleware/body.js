const mongoose = require('mongoose');

const genValidator = require('utils/schema/model/genValidator');
const genMiddleware = require('utils/router/genMiddleware');

const { Schema } = mongoose;

const schema = new Schema({
  subtitleFiles: [
    {
      lang: { type: String, default: null },
      key: { type: String, default: null }
    }
  ]
}, { _id: false });

module.exports = genMiddleware(genValidator(schema), 'body');
