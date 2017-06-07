const mongoose = require('mongoose');
const CaaError = reqlib('./utils/CaaError');

let schema = new mongoose.Schema({
  offset: { type: Number, min: 0, default: 0 },
  limit: { type: Number, min: 0, default: 20 },
  isActive: Boolean
}, { _id: false });

let Params = mongoose.model('AdminAccountListQueryParams', schema);

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
