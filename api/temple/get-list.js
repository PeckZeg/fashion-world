const Mock = require('mockjs');
const _ = require('lodash');

const mockResponse = require('../../utils/mock-response');

module.exports = function(req, res) {
  mockResponse(res, Mock.mock({
    detail: {
      id: '@integer(1, 32)'
    }
  }));
};
