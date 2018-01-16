const uploadFileFromUrl = require('utils/qiniu/uploadFileFromUrl');
const fetchUserInfo = require('utils/weixin/fetchUserInfo');
const handleError = require('utils/response/handleError');
const toGender = require('utils/weixin/toGender');

const User = require('models/User');

module.exports = async function (req, res, next) {
  try {
    const { accessToken, openid, unionid } = req.body;
    const { nickname, sex, headimgurl } = await fetchUserInfo(accessToken, openid);

    let user = await User.findOne({
      // 'thirdParty.weixin.openid': openid,
      'thirdParty.weixin.unionid': unionid
    });

    if (!user) {
      let avatar = null;

      if (headimgurl) {
        avatar = await uploadFileFromUrl(headimgurl);
      }

      user = new User({
        name: nickname,
        gender: toGender(sex),
        avatar,
        'thirdParty.weixin.openid': openid,
        'thirdParty.weixin.unionid': unionid,
        'thirdParty.weixin.bindAt': new Date()
      });

      user = await user.save();
    }

    res.send({ user: user.toJSON() });
  }

  catch (err) {
    handleError(res, err);
  }
};
