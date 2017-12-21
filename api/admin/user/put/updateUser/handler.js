const isEmpty = require('lodash/isEmpty');

const handleResult = require('utils/response/handleResult');
const handleError = require('utils/response/handle-error');
const authToken = require('utils/token/auth/account');
const createLog = require('utils/createAccountLog');

const User = require('models/User');

const action = 'ADMIN_USER_PUT_UPDATE_USER';

module.exports = async (req, res, next) => {
  try {
    if (isEmpty(req.body)) {
      throw new ResponseError(400, 'empty request body');
    }

    const log = createLog(req, action);
    const token = await authToken(req, action, { log });
    const { userId } = req.params;
    const doc = { $set: req.body };
    const opts = { new: true };
    let user = await User.findByIdAndUpdate(userId, doc, opts);

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
