module.exports = {
  apiActions: {
    'client:user:post:refresh-keys': 'user:refresh-keys',
    'user.get.personal-profile': 'user:personal-profile',
    'user.delete.logout': 'user:logout',

    'video:get:fetch-video-list': 'video:fetch-video-list',
    'video:get:fetch-video-profile': 'video:fetch-video-profile',
    'video:get:fetch-recommend-video-list': 'video:fetch-recommend-video-list',
    'video:put:favour-video': 'video:favour-video',
    'video:put:add-collection': 'video:add-collection',
    'video:delete:destroy-favour-video': 'video:destroy-favour-video',
    'video:delete:destroy-collection': 'video:destroy-collection',

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

    'admin:channel:get:fetch-channel-list': 'admin:channel:fetch-channel-list',
    'admin:channel:get:fetch-channel-profile': 'admin:channel:fetch-channel-profile',
    'admin:channel:put:update-channel': 'admin:channel:update-channel',

    'admin:category:get:fetch-category-list': 'admin:category:fetch-category-list',
    'admin:category:get:fetch-category-profile': 'admin:category:fetch-category-profile',
    'admin:category:post:create-category': 'admin:category:create-category',
    'admin:category:post:enable-category': 'admin:category:enable-category',
    'admin:category:put:update-category': 'admin:category:update-category',
    'admin:category:del:destroy-category': 'admin:category:destroy-category',

    'admin:video-channel:get:fetch-list': 'admin:video-channel:fetch-list',

    'admin:video-category:get:fetch-list': 'admin:video-category:fetch-list'
  },

  // keys sha256 秘钥
  keysCryptoSecrets: {
    apiKey: 'peckzeg-api-key',
    secretKey: 'peckzeg-secret-key'
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
