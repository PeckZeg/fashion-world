module.exports = {
  alidayu: {
    appkey: '23580200',
    appsecret: 'adb3a077dd4819ada46710a2ee6333b5',
    restUrl: 'http://gw.api.taobao.com/router/rest',
    smsNumSend: {
      signName: '正辰',
      templateCode: 'SMS_67140688',
      maxCountPerDay: 10,
      maxCountPerHour: 5,
      perMsgLiveCycle: 60 * 10000
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
}
