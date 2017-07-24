module.exports = {
  apiActions: {
    'client:user:post:refresh-keys': 'user:refresh-keys',
    'user.get.personal-profile': 'user:personal-profile',
    'user.delete.logout': 'user:logout',

    'client:video:get:fetch-video-list': 'video:fetch-video-list',
    'client:video:get:fetch-video-profile': 'video:fetch-video-profile',
    'client:video:put:favour-video': 'video:favour-video',
    'client:video:put:collect-video': 'video:collect-video',
    'client:video:del:destroy-favourite-video': 'video:destroy-favourite-video',
    'client.video:del.destroy-collected-video': 'video:destroy-collected-video',

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

    folder: 'FTV',

    folders: {
      ftv: 'FTV'
    },

    fashionWorld: {
      host: '172.16.0.12',
      user: 'wlctest',
      password: 'wlctest'
    },

    resource: {
      host: '172.16.0.80',
      user: 'ftpadmin',
      password: 'xMzc.123',
      folders: {
        images: 'images',
        videos: 'videos'
      }
    }
  },

  ftpToHttp: {
    resource: {
      protocol: 'http:',
      host: '59.57.240.50:5052',
      basePathname: 'static'
    }
  },

  sourceVideo: {
    hostname: 'http://video.ftvcn.com',
    basePathname: 'download'
  }
};
