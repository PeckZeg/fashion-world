const mongoose = require('mongoose');
const CaaError = reqlib('./utils/CaaError');

let schema = new mongoose.Schema({
  name: { type: String, minlength: 1, maxLength: 64 },
}, { _id: false });

let Params = mongoose.model('VideoChannelCategoryListQueryParams', schema);

module.exports = body => new Promise((resolve, reject) => {
  let params = new Params(body);

  params.validate(err => {
    if (err) {
      let key = _.chain(err.errors).keys().first().value();
      let error = err.errors[key];

      reject(error ? CaaError(400, error.message) : err);
    }

    else {
      resolve(params.toJSON());
    }
  });
});
