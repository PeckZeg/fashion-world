const Mock = require('mockjs');
const _ = require('lodash');

const mockResponse = require('../../utils/mock-response');

module.exports = function(req, res) {
  mockResponse(res, Mock.mock({
    detail: {
      id: +req.params.id,
      name: '@ctitle(2, 16)',
      banner: '/images/tmp/buddha-cover-2.png',
      introduction: '@cparagraph(8, 32)',
      views: '@natural(2, 65536)',
      follows: '@natural(2, 65536)',
      created_at: '@date("yyyy-MM-dd HH:mm:ss")',
      updated_at: '@date("yyyy-MM-dd HH:mm:ss")',
      deleted_at: null,
      tag: [
        {
          id: '@integer(2, 32)',
          name: '@ctitle(2)',
          status: 1
        }
      ]
    }
  }));
};
