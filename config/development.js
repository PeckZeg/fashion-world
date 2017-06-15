module.exports = {
  alidayu: {
    appkey: '24380690',
    appsecret: 'd296b0da0e681ee22b90eaa3cfb3107b',
    restUrl: 'http://gw.api.taobao.com/router/rest',
    smsNumSend: {
      register: {
        signName: '阿里大于测试专用',
        templateCode: 'SMS_71260267',
        maxCountPerDay: 10,
        maxCountPerHour: 5,
        perMsgLiveCycle: 60 * 10000,
        product: 'Fashion World'
      },

      resetPassword: {
        signName: '阿里大于测试专用',
        templateCode: 'SMS_71260265',
        maxCountPerDay: 10,
        maxCountPerHour: 5,
        perMsgLiveCycle: 60 * 10000,
        product: 'Fashion World'
      },
    }
  },

  mongodb: {
    host: 'localhost',
    port: 27017,
    database: 'fwdb_dev'
  },

  redis: {
    database: 0,
    password: 'xmzc.123'
  },

  resource: {
    protocol: 'http:',
    host: 'localhost:3003'
  }
};

if (process.env.NODE_DATABASE == 'test') {
  module.exports.mongodb = {
    host: 'localhost',
    port: 27017,
    database: 'fwdb_dev',
    user: 'fwadmin',
    pass: 'xmzc.123',
  };

  module.exports.resource = {
    protocol: 'http:',
    host: '59.57.240.50:5005'
  };
}
