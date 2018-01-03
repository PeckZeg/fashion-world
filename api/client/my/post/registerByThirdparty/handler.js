const uploadFileFromUrl = require('utils/qiniu/uploadFileFromUrl');
const fetchUserInfo = require('utils/weixin/fetchUserInfo');
const handleError = require('utils/response/handleError');
const createClient = require('redis/createClient');
const toGender = require('utils/weixin/toGender');

const User = require('models/User');

module.exports = async function (req, res, next) {
  const client = createClient();

  try {
    const { mobile, code, accessToken } = req.body;
    const key = require('redis/keys/client/sms/sent')(mobile);

    // validate code
    const validateCode = await client.getAsync(key);

    if (!validateCode) {
      throw new ResponseError(404, 'code is not sent');
    }

    if (validateCode !== code) {
      throw new ResponseError(403, 'invalid code');
    }

    // check user exists
    const userCount = await User.count({
      $or: [
        { mobile },
        { 'thirdParty.weixin.openid': req.body.openid },
        { 'thirdParty.weixin.unionid': req.body.unionid }
      ]
    });

    if (process.env.NODE_ENV === 'production' && userCount) {
      throw ResponseError(400, 'user exists');
    }

    const { openid, unionid, nickname, sex, headimgurl } = await fetchUserInfo(
      accessToken, req.body.openid
    );
    let avatar = null;

    if (headimgurl) {
      avatar = await uploadFileFromUrl(headimgurl);
    }

    // create / update doc
    const cond = { mobile };
    const doc = {
      $set: {
        mobile,
        name: nickname,
        gender: toGender(sex),
        avatar,
        'thirdParty.weixin.openid': openid,
        'thirdParty.weixin.unionid': unionid,
        'thirdParty.weixin.bindAt': new Date()
      }
    };
    const opts = { new: true, upsert: true };
    const user = await User.findOneAndUpdate(cond, doc, opts);

    await client.delAsync(key);
    res.send({ user: user.toJSON() });
  }

  catch (err) {
    handleError(res, err);
  }

  finally {
    await client.quitAsync();
  }
};