const request = require('request-promise');

module.exports = async (access_token, openid) => {
  const result = await request({
    uri: 'https://api.weixin.qq.com/sns/userinfo',
    qs: {
      access_token,
      openid
    },
    json: true
  });

  if (result.errcode && result.errmsg) {
    throw new ResponseError(400, result.errmsg);
  }

  return result;
};
