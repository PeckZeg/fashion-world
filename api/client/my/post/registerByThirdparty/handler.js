const uploadFileFromUrl = require('utils/qiniu/uploadFileFromUrl');
const fetchUserInfo = require('utils/weixin/fetchUserInfo');
const handleError = require('utils/response/handleError');
const toGender = require('utils/weixin/toGender');

const User = require('models/User');

module.exports = async function (req, res, next) {
  try {
    const { accessToken, openid, unionid } = req.body;
    const { nickname, sex, headimgurl } = await fetchUserInfo(accessToken, openid);
    let avatar = null;

    if (headimgurl) {
      avatar = await uploadFileFromUrl(headimgurl);
    }

    const cond = {
      'thirdParty.weixin.openid': openid,
      'thirdParty.weixin.unionid': unionid
    };
    const doc = {
      $setOnInsert: {
        name: nickname,
        gender: toGender(sex),
        avatar,
        'thirdParty.weixin.openid': openid,
        'thirdParty.weixin.unionid': unionid,
        'thirdParty.weixin.bindAt': new Date()
      }
    };
    const opts = { new: true, upsert: true };

    // create / update doc
    const user = await User.findOneAndUpdate(cond, doc, opts);

    res.send({ user: user.toJSON() });
  }

  catch (err) {
    handleError(res, err);
  }
};
