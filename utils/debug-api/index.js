const onFinished = require('on-finished');
const colors = require('colors/safe');
const debug = require('debug')('api');
const path = require('path');

const colorMethod = require('./colorMethod');
const iterObject = require('./iterObject');

const colorTitle = (title, object) => debug(
  '  ',
  `${colors.bold(title)}\t`,
  colors.italic.grey(`(${_.size(object)})`),
  ':',
  _.isEmpty(object) ? colors.gray('null') : ''
);

module.exports = (req, res, next) => {
  onFinished(req, (err, req) => {
    const { params, query, body } = req;
    const { statusCode } = req.res;
    const method = colorMethod(req);
    const pathname = req.__route__;

    // method & pathname
    debug(method, colors.gray(statusCode), colors.grey(pathname));

    // params
    if (!_.isEmpty(req.__params__)) {
      colorTitle('params', req.__params__);
      iterObject(req.__params__);
    }

    // query
    colorTitle('query', query);
    iterObject(query);

    // body
    if (req.method != 'GET') {
      colorTitle('body', body);
      iterObject(body);
    }
  });

  next();
};
