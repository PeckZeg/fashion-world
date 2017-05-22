const mongoose = require('mongoose');
const CaaError = reqlib('./utils/CaaError');

let schema = new mongoose.Schema({
  mobile: { type: String, required: true, validate: { validator: v => /^\d{11}$/.test(v) } },
}, { _id: false });

let Params = mongoose.model('UserCreateResetPasswordVerifyCodeParams', schema);

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
