const handleResult = require('utils/response/handleResult');
const handleError = require('utils/response/handle-error');
const authToken = require('utils/token/auth/account');
const createLog = require('utils/createAccountLog');

const User = require('models/User');

const action = 'ADMIN_USER_GET_FETCH_USER_PROFILE';

module.exports = async (req, res, next) => {
  try {
    const log = createLog(req, action);
    const token = await authToken(req, action, { log });
    let user = await User.findById(req.params.userId);

    if (!user) {
      throw new ResponseError(404, 'user not found');
    }

    user = user.toObject();

    handleResult(res, { user }, log);
  }

  catch (err) {
    handleError(res, err);
  }
};
