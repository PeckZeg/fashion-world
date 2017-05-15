const mongoose = require('mongoose');
// const { Schema, Types } = mongoose;

let schema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3, maxLength: 15 },
  password: { type: String, required: true }
}, { _id: false });

let Params = mongoose.model('AccountLoginParams', schema);

module.exports = body => new Promise((resolve, reject) => {
  let params = new Params(body);

  params.validate(err => {
    if (err) {
      let key = _.chain(err.errors).keys().first().value();
      let error = err.errors[key];

      if (error) {
        error.status = 400;
        reject(error);
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
