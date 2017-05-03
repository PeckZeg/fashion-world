const Mock = require('mockjs');
const _ = require('lodash');

const ERROR_STATUS_LIST = [400, 401, 402, 403, 404, 500, 501, 502];

module.exports = function(res, successRes, opts = {}) {
  opts = Object.assign({
    timeout: _.random(256, 2048),
    successProb: 0,
  }, opts);

  var { timeout, successProb } = opts;
  var status = 200;
  var body = {};

  setTimeout(() => {
    if (Math.random() > successProb) {
      body = successRes;
    }

    else {
      status = ERROR_STATUS_LIST[_.random(0, ERROR_STATUS_LIST.length - 1)];
      body = Mock.mock({
        status_code: '@integer(64, 65536)',
        message: '@cword(8, 16)'
      });
    }

    res.status(status).send(body);
  }, timeout);
};
