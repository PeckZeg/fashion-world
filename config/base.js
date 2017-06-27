module.exports = {
  apiActions: {
    'user.get.personal-profile': 'user:personal-profile',
    'user.delete.logout': 'user:logout',

    'admin:account:get:list': 'admin:account:get-list',
    'admin:account:post:create-account': 'admin:account:create-account',
    'admin:account:put:update-account': 'admin:account:update-account',
    'admin:account:delete:destroy-account': 'admin:account:destroy-account',
    'admin:account:delete:logout': 'admin:account:logout',

    'admin:video:get:fetch-list': 'admin:video:fetch-list',
    'admin:video:get:fetch-profile': 'admin:video:fetch-profile',
    'admin:video:post:upload-cover': 'admin:video:upload-cover',
    'admin:video:put:update-video': 'admin:video:update-video',
    'admin:video:delete:destroy-video': 'admin:video:destroy-video',

    'admin:video-channel:get:fetch-list': 'admin:video-channel:fetch-list',

    'admin:video-category:get:fetch-list': 'admin:video-category:fetch-list'
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
