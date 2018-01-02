const fetchUserInfo = require('utils/weixin/fetchUserInfo');
const handleError = require('utils/response/handleError');
const toGender = require('utils/weixin/toGender');

const User = require('models/User');

module.exports = async function (req, res, next) {
  try {
    const { mobile, code, accessToken } = req.body;
    let user = await User.findOne({
      $or: [
        { mobile },
        { 'thirdParty.weixin.openid': req.body.openid },
        { 'thirdParty.weixin.unionid': req.body.unionid }
      ]
    });

    if (user) {
      throw ResponseError(400, 'user exists');
    }

    const { openid, unionid, nickname, sex, headimgurl } = fetchUserInfo(
      accessToken, req.body.openid
    );
    const gender = toGender(sex);
  }

  catch (err) {
    handleError(res, err);
  }
};
