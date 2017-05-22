const mongoose = require('mongoose');
const CaaError = reqlib('./utils/CaaError');

let schema = new mongoose.Schema({
  mobile: {
    required: true,
    type: String,
    validate: {
      validator: v => /^\d{11}$/.test(v)
    }
  },

  password: {
    type: String,
    required: true
  },

  code: {
    type: String,
    required: true,
    validate: {
      validator: v => /^\d{6}$/.test(v)
    }
  }
}, { _id: false });

let Params = mongoose.model('UserCreateParams', schema);

module.exports = body => new Promise((resolve, reject) => {
  let params = new Params(body);

  params.validate(err => {
    if (err) {
      let key = _.chain(err.errors).keys().first().value();
      let error = err.errors[key];

      if (error) {
        reject(CaaError(400, error.message));
      }

      else {
        reject(err);
      }
    }

    else {
      resolve(params);
    }
  });
});