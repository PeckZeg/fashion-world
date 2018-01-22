const fetchUserInfo = require('utils/weixin/fetchUserInfo');
const handleError = require('utils/response/handleError');
const genKeys = reqlib('./utils/token/user/genKeys');

const User = require('models/User');

module.exports = async (req, res, next) => {
  try {
    const { accessToken } = req.body;
    const wxUser = await fetchUserInfo(accessToken, req.body.openid);
    const { openid, unionid } = wxUser;
    const user = await User.findOne({
      // 'thirdParty.weixin.openid': openid,
      'thirdParty.weixin.unionid': unionid
    });

    if (!user) {
      throw new ResponseError(404, 'user not found');
    }

    res.send(await genKeys(user));
  }

  catch (err) {
    handleError(res, err);
  }
};
