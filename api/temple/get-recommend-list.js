const Mock = require('mockjs');
const _ = require('lodash');

const mockResponse = require('../../utils/mock-response');

module.exports = (req, res) => {
  mockResponse(res, Mock.mock({
    list: {
      'data|1-5': [
        {
          id: '@integer(1, 32)',
          name: '@ctitle(2, 16)',
          banner: '/images/tmp/temple-cover-2.png',
          views: '@natural(2, 65536)',
          follows: '@natural(2, 65536)',
          created_at: '@date("yyyy-MM-dd HH:mm:ss")',
          category: {
            id: '@integer(1, 8)',
            name: '@ctitle(2, 8)'
          },
          tag: [
            {
              id: '@integer(2, 32)',
              name: '@ctitle(2)',
              status: 1
            }
          ]
        }
      ]
    }
  }));
};
