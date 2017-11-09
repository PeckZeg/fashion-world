const destroyToken = require('utils/token/user/destroyToken');
const handleError = require('utils/response/handleError');
const genKeys = require('utils/token/user/genKeys');
const authToken = require('utils/token/auth/user');

const User = require('models/User');

const ACTION = 'CLIENT_MY_POST_REFRESH_TOKEN';

module.exports = async (req, res, next) => {
  try {
    const { apiKey, userId } = await authToken(req, ACTION, { required: true });
    let user = await User.findById(userId);

    if (!user) {
      throw new ResponseError(404, 'user not found');
    }

    await destroyToken(user, apiKey);
    res.send(await genKeys(user));
  }

  catch (err) {
    handleError(res, err);
  }
};
