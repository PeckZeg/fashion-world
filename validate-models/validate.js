// module.exports = (Params, transform, is) => body => new Promise((resolve, reject) => {
//   const params = new Params(body);
//
//   params.validate(err => {
//     if (err) {
//       const key = _.chain(err.errors).keys().first().value();
//       const error = err.errors ? err.errors[key] : null;
//
//       return reject(error ? new ResponseError(400, error.message) : err);
//     }
//
//     let paramsJSON = params.toJSON();
//
//     if (typeof transform === 'function') {
//       paramsJSON = transform(params, paramsJSON, body);
//     }
//
//     resolve(paramsJSON);
//   });
// });


module.exports = (Params, transform, isFilterEmptyArray = false) => body => Promise.resolve(
  new Params(body)
)

  .then(params => new Promise((resolve, reject) => {
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

      if (isFilterEmptyArray) {
        Object.keys(paramsJSON).forEach(key => {
          if (Array.isArray(paramsJSON[key]) && !paramsJSON[key].length) {
            delete paramsJSON[key];
          }
        });
      }

      resolve(paramsJSON);
    });
  }));
