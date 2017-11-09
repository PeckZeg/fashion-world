const fetchUserInfo = require('utils/weixin/fetchUserInfo');
const handleError = require('utils/response/handleError');
const authToken = require('utils/token/auth/user');
const get = require('lodash/get');

const User = require('models/User');

const ACTION = 'CLIENT_MY_PUT_BIND_WEIXIN';

module.exports = async (req, res, next) => {
  try {
    const token = await authToken(req, ACTION, { required: true });
    const { accessToken, userId } = req.body;
    let user = await User.findOne({ _id: userId });

    if (!user) {
      throw new ResponseError(404, 'user not found');
    }

    if (get(user, 'thirdParty.weixin.openid') ||
        get(user, 'thirdParty.weixin.unionid')) {
      throw new ResponseError(403, 'user has related to weixin account');
    }

    const { openid, unionid } = await fetchUserInfo(accessToken, req.body.openid);
    const doc = {
      $set: {
        'thirdParty.weixin': { openid, unionid }
      }
    };
    const opts = { new: true };

    user = await User.findByIdAndUpdate(userId, doc, opts);
    user = user.toJSON();

    res.send({ user });
  }

  catch (err) {
    handleError(res, err);
  }
};
