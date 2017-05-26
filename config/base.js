module.exports = {
  apiActions: {
    'user.get.personal-profile': 'user:personal-profile',
    'user.delete.logout': 'user:logout',

    'account.delete.logout': 'account:logout',
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
    host: 'http://video.ftvcn.com/download'
  }
};
