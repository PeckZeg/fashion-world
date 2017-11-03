const isFunction = require('lodash/isFunction');
const isArray = require('lodash/isArray');

module.exports = (Model, opts = {}) => body => (
  new Promise((resolve, reject) => {
    const params = new Model(body);

    params.validate(err => {
      if (err) {
        const key = _.chain(err.errors).keys().first().value();
        const error = err.errors ? err.errors[key] : null;

        return reject(error ? new ResponseError(400, error.message) : err);
      }

      let output = params.toJSON();

      if (isFunction(opts.transform)) {
        output = opts.transform(params, output, body);
      }

      if (opts.isFilterEmptyArray) {
        Object.keys(output).forEach(key => {
          if (isArray(output[key]) && output[key].length == 0) {
            delete output[key];
          }
        });
      }

      resolve(output);
    });
  })
);
