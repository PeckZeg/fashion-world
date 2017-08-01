module.exports = {
  alidayu: {
    appkey: '24380690',
    appsecret: 'd296b0da0e681ee22b90eaa3cfb3107b',
    restUrl: 'http://gw.api.taobao.com/router/rest',
    maxCountPerDay: 10,
    maxCountPerHour: 5,
    perMsgLiveCycle: 60 * 1000,

    smsNumSend: {
      user: {
        register: {
          signName: '阿里大于测试专用',
          templateCode: 'SMS_71260267',
          product: 'Fashion World'
        },

        resetPassword: {
          signName: '阿里大于测试专用',
          templateCode: 'SMS_71260265',
          product: 'Fashion World'
        }
      },

      // 弃用
      register: {
        signName: '阿里大于测试专用',
        templateCode: 'SMS_71260267',
        product: 'Fashion World',
        maxCountPerDay: 10,
        maxCountPerHour: 5,
        perMsgLiveCycle: 60 * 1000,
      },

      // 弃用
      resetPassword: {
        signName: '阿里大于测试专用',
        templateCode: 'SMS_71260265',
        product: 'Fashion World',
        maxCountPerDay: 10,
        maxCountPerHour: 5,
        perMsgLiveCycle: 60 * 1000,
      },
    }
  },

  mongodb: {
    host: 'localhost',
    port: 27017,
    database: 'fwdb_dev'
  },

  redis: {
    database: 0
  },

  resource: {
    protocol: 'http:',
    host: 'localhost:3003'
  },

  model: {
    user: {
      defaultAvatar: '/static/images/avatar/default/256x256.png'
    }
  },

  localStaticPath: '/data/static'
};

if (process.env.NODE_RUNTIME == 'test') {
  module.exports.mongodb = {
    host: 'localhost',
    port: 27017,
    database: 'fwdb_dev',
    user: 'fwadmin',
    pass: 'xmzc.123',
  };

  module.exports.redis = {
    ...module.exports.redis,
    password: 'xmzc.123'
  };

  module.exports.resource = {
    ...module.exports.resource,
    protocol: 'http:',
    host: '59.57.240.50:5005'
  };
}
