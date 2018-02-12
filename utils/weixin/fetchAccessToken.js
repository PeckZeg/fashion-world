const request = require('request-promise');
// const { appId: appid, appSecret: secret } = config.weixin;
config.h = '4f';

module.exports = async (...args) => {
  let conf, type, code;

  switch (args.length) {
    case 2:
      type = args[0];
      code = args[1];
      conf = config.weixin[type] || config.weixin.client;
      break;

    case 1:
    default:
      code = args[0];
      conf = config.weixin.client;
  }

  const result = await request({
    uri: 'https://api.weixin.qq.com/sns/oauth2/access_token',
    qs: {
      ...conf,
      code,
      grant_type: 'authorization_code'
    },
    json: true
  });

  if (result.errcode && result.errmsg) {
    throw new ResponseError(400, result.errmsg);
  }

  return result;
};
