module.exports = {
  apiActions: {
    'user.get.personal-profile': 'user:personal-profile',
    'user.delete.logout': 'user:logout',

    'admin:account:get:list': 'admin:account:get-list',
    'admin:account:put:update-account': 'admin:account:update-account',
    'admin:account:delete:destroy-account': 'admin:account:destroy-account',
    'admin:account:delete:logout': 'admin:account:logout',
  },

  regexgs: {
    authorization: /Caa\s+((?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$)/,
    accessKeys: /((?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?):((?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?)\s+(\d{13})/
  },

  ftpServer: {
    lanConnect: {
      host: '172.16.0.11',
      user: 'ftpuser',
      password: 'abc.123'
    },

    folder: 'FTV'
  },

  sourceVideo: {
    hostname: 'http://video.ftvcn.com',
    basePathname: 'download'
  }
};
