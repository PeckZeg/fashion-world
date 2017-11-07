const debug = require('debug')('api');
const colors = require('colors/safe');

const has = require('lodash/has');

/**
 *  捕获错误对象
 *  @param {Error} err 错误对象
 *  @returns {null|Error} 生成的错误对象
 */
const catchError = err => {
  if (!err) return null;

  let key = _.chain(err.errors).keys().first().value();
  let error = key ? err.errors[key] : null;
  let message = (error ? error.message : err.message) || 'Internal Server Error';
  let status = (error ? error.status : err.status) || 500;

  if (message.includes('duplicate key error')) {
    message = 'duplicate key error';
  }

  if (err.constructor.name == 'StatusCodeError') {
    status = err.statusCode;
    message = err.error[Object.keys(err.error)[0]];
  }

  return new ResponseError(status, message);
};

/**
 *  处理错误对象
 *  @param {object} res Router response 对象
 *  @param {Error} err 错误对象
 */
module.exports = (res, err) => {
  const { status, message } = catchError(err) || {};

  if (err instanceof ResponseError) {
    debug(
      colors.bgRed.white(' ERROR '),
      colors.bgYellow.grey(` ${err.status} `),
      err.message
    );
  }

  else {
    console.error(err);
  }

  res.status(status || 500).send({ message });
};
