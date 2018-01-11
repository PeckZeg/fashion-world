// 跨域白名单
exports.origins = require('../origins');

// 各种正则表达式
exports.patterns = require('../patterns');

// 令牌
exports.token = require('./token');

// 缓存
exports.cache = require('./cache');

// 图片
exports.images = require('./images');

// 七牛公共设置
exports.qiniu = require('./qiniu');

// 微信设置
exports.weixin = require('./weixin');

// 接口动作
exports.apiActions = require('../apiActions');

/**
 *  @deprecated 以下配置不再使用了
 */
exports.dataPath = {
  contact: './data/contact.json'
};

exports.keysCryptoSecrets = {
  apiKey: 'peckzeg-api-key',
  secretKey: 'peckzeg-secret-key'
};

exports.regexgs = {
  authorization: /Caa\s+((?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$)/,
  accessKeys: /((?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?):((?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?)\s+(\d{13})/
};

exports.ftpServer = {
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

  sync: {
    host: '172.16.0.12',
    user: 'zsp_ftp',
    password: 'zsp.901'
  },

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
};

exports.ftpToHttp = {
  resource: {
    protocol: 'http:',
    host: '59.57.240.50:5052',
    basePathname: 'static'
  }
};

exports.sourceVideo = {
  hostname: 'http://video.ftvcn.com',
  basePathname: 'download'
};
