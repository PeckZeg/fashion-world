exports.appkey = '24380690';
exports.appsecret = 'd296b0da0e681ee22b90eaa3cfb3107b';
exports.restUrl = 'http://gw.api.taobao.com/router/rest';
exports.maxCountPerDay = 10;
exports.maxCountPerHour = 5;
exports.perMsgLiveCycle = 60 * 1000;

exports.smsNumSend = {
  user: {
    register: {
      signName: '正辰科技',
      templateCode: 'SMS_71260267',
      product: 'Fashion World'
    },

    resetPassword: {
      signName: '正辰科技',
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
