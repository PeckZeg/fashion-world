module.exports = (Params, transform) => body => new Promise((resolve, reject) => {
  const params = new Params(body);

  params.validate(err => {
    if (err) {
      const key = _.chain(err.errors).keys().first().value();
      const error = err.errors ? err.errors[key] : null;

      return reject(error ? new ResponseError(400, error.message) : err);
    }

    let paramsJSON = params.toJSON();

    if (typeof transform === 'function') {
      paramsJSON = transform(params, paramsJSON, body);
    }

    resolve(paramsJSON);
  });
});

// const CaaError = reqlib('./utils/CaaError');
//
// module.exports = (Params, transform) => body => new Promise((resolve, reject) => {
//   let params = new Params(body);
//
//   params.validate(err => {
//     if (err) {
//       let key = _.chain(err.errors).keys().first().value();
//       let error = err.errors[key];
//
//       reject(error ? CaaError(400, error.message) : err);
//     }
//
//     else {
//       let paramsJSON = params.toJSON();
//
//       if (typeof transform === 'function') {
//         paramsJSON = transform(params, paramsJSON, body);
//       }
//
//       resolve(paramsJSON);
//     }
//   });
// });
