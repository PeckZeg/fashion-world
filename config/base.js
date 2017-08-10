module.exports = {
  apiActions: {
    'client:user:get:fetch-user-list': 'user:fetch-user-list',
    'client:user:get:fetch-user-profile': 'user:fetch-user-profile',
    'client:user:get:fetch-user-favourite-video-list': 'user:fetch-user-favourite-video-list',
    'client:user:get:fetch-user-collected-video-list': 'user:fetch-user-collected-video-list',
    'client:user:post:refresh-keys': 'user:refresh-keys',
    'client:user:put:update-personal-profile': 'user:update-personal-profile',
    'user.get.personal-profile': 'user:personal-profile',
    'user.delete.logout': 'user:logout',

    'client:video:get:fetch-video-list': 'video:fetch-video-list',
    'client:video:get:fetch-video-profile': 'video:fetch-video-profile',
    'client:video:get:fetch-random-video-list': 'video:fetch-random-video-list',
    'client:video:get:search-video': 'video:search-video',
    'client:video:put:favour-video': 'video:favour-video',
    'client:video:put:collect-video': 'video:collect-video',
    'client:video:del:destroy-favourite-video': 'video:destroy-favourite-video',
    'client.video:del.destroy-collected-video': 'video:destroy-collected-video',

    'admin:account:get:fetch-account-list': 'admin:account:fetch-account-list',
    'admin:account:get:fetch-account-profile': 'admin:account:fetch-account-profile',
    'admin:account:post:create-account': 'admin:account:create-account',
    'admin:account:put:update-account': 'admin:account:update-account',
    'admin:account:delete:destroy-account': 'admin:account:destroy-account',
    'admin:account:delete:logout': 'admin:account:logout',

    'admin:video:get:fetch-video-list': 'admin:video:fetch-video-list',
    'admin:video:get:fetch-video-profile': 'admin:video:fetch-video-profile',
    'admin:video:post:upload-video-cover': 'admin:video:upload-video-cover',
    'admin:video:post:publish-video': 'admin:video:publish-video',
    'admin:video:post:recommend-video': 'admin:video:recommend-video',
    'admin:video:put:update-video': 'admin:video:update-video',
    'admin:video:delete:destroy-video': 'admin:video:destroy-video',
    'admin:video:delete:block-video': 'admin:video:block-video',
    'admin:video:delete:supplant-video': 'admin:video:supplant-video',

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
    fashiontv: {
      host: '172.16.0.11',
      user: 'ftpuser',
      password: 'abc.123'
    },

    // folder: 'FTV',
    //
    // folders: {
    //   ftv: 'FTV'
    // },

    fashionWorld: {
      host: '172.16.0.12',
      user: 'ftpadmin',
      password: 'xMzc.123'
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
