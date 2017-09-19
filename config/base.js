const apiActions = require('./apiActions');
const patterns = require('./patterns');

module.exports = {

  // 各种正则表达式
  patterns,

  apiActions: {
    'client:user:get:fetch-user-list': 'user:fetch-user-list',
    'client:user:get:fetch-user-profile': 'user:fetch-user-profile',
    'client:user:get:fetch-user-favourite-video-list': 'user:fetch-user-favourite-video-list',
    'client:user:get:fetch-user-collected-video-list': 'user:fetch-user-collected-video-list',
    'client:user:post:refresh-keys': 'user:refresh-keys',
    'client:user:post:upload-personal-avatar': 'user:upload-personal-avatar',
    'client:user:put:update-personal-profile': 'user:update-personal-profile',
    'user.get.personal-profile': 'user:personal-profile',
    'user.delete.logout': 'user:logout',
    'client:user:destroy-personal-collected-videos': 'user:destroy-personal-collected-videos',
    'client:user:destroy-personal-favourite-videos': 'user:destroy-personal-favourite-videos',

    'client:video:get:fetch-video-list': 'video:fetch-video-list',
    'client:video:get:fetch-video-profile': 'video:fetch-video-profile',
    'client:video:get:fetch-random-video-list': 'video:fetch-random-video-list',
    'client:video:get:search-video': 'video:search-video',
    'client:video:put:favour-video': 'video:favour-video',
    'client:video:put:collect-video': 'video:collect-video',
    'client:video:del:destroy-favourite-video': 'video:destroy-favourite-video',
    'client.video:del.destroy-collected-video': 'video:destroy-collected-video',

    'client:loop-video:fetch-loop-video-list': 'loop-video:fetch-loop-video-list',

    'admin:video:get:fetch-video-list': 'admin:video:fetch-video-list',
    'admin:video:get:fetch-video-profile': 'admin:video:fetch-video-profile',
    'admin:video:post:upload-video-cover': 'admin:video:upload-video-cover',
    'admin:video:post:recover-video': 'admin:video:recover-video',
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

    'admin:contact:get:fetch-contact-list': 'admin:contact:fetch-contact-list',
    'admin:contact:post:update-contact': 'admin:contact:update-contact',

    'admin:banner:get:fetch-banner-list': 'admin:banner:fetch-banner-list',
    'admin:banner:post:create-banner': 'admin:banner:create-banner',
    'admin:banner:post:upload-banner-cover': 'admin:banner:upload-banner-cover',
    'admin:banner:post:publish-banner': 'admin:banner:publish-banner',
    'admin:banner:post:recover-banner': 'admin:banner:recover-banner',
    'admin:banner:put:update-banner': 'admin:banner:update-banner',
    'admin:banner:del:block-banner': 'admin:banner:block-banner',
    'admin:banner:del:destroy-banner': 'admin:banner:destroy-banner',

    'admin:loop-video:get:fetch-loop-video-list': 'admin:loop-video:fetch-loop-video-list',
    'admin:loop-video:get:fetch-loop-video-profile': 'admin:loop-video:fetch-loop-video-profile',
    'admin:loop-video:post:create-loop-video': 'admin:loop-video:create-loop-video',
    'admin:loop-video:post:upload-loop-video-cover': 'admin:loop-video:upload-loop-video-cover',
    'admin:loop-video:post:publish-loop-video': 'admin:loop-video:publish-loop-video',
    'admin:loop-video:post:recover-loop-video': 'admin:loop-video:recover-loop-video',
    'admin:loop-video:put:update-loop-video': 'admin:loop-video:update-loop-video',
    'admin:loop-video:del:block-loop-video': 'admin:loop-video:block-loop-video',
    'admin:loop-video:del:destroy-loop-video': 'admin:loop-video:destroy-loop-video',

    ...apiActions
  },

  dataPath: {
    contact: './data/contact.json'
  },

  // keys sha256 秘钥
  keysCryptoSecrets: {
    apiKey: 'peckzeg-api-key',
    secretKey: 'peckzeg-secret-key'
  },

  // 废弃
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

    fashionOne: {
      host: '172.16.0.12',
      user: 'resources',
      password: 'xmzc.123'
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
