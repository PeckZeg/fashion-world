const mongoose = require('mongoose');
const CaaError = reqlib('./utils/CaaError');

const { Schema } = mongoose;
const { ObjectId } = Schema;

let schema = new mongoose.Schema({
  offset: { type: Number, min: 0, default: 0 },
  limit: { type: Number, min: 0, default: 20 },
  isRecommend: Boolean,
  categoryId: ObjectId,
  channelId: ObjectId,
  tags: [String],
  sourceId: [ObjectId]
}, { _id: false });

let Params = mongoose.model('VideoListQueryParams', schema);

module.exports = (body, transform) => new Promise((resolve, reject) => {
  let params = new Params(body);

  params.validate(err => {
    if (err) {
      let key = _.chain(err.errors).keys().first().value();
      let error = err.errors[key];

      reject(error ? CaaError(400, error.message) : err);
    }

    else {
      let query = params.toJSON();

      if (typeof transform === 'function') {
        query = transform(query);
      }

      resolve(query);
    }
  });
});
