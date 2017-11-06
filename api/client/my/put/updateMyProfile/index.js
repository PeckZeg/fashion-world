const handleError = reqlib('./utils/response/handleError');
const authToken = reqlib('./utils/token/auth/user');
const validate = require('./validate');

const User = reqlib('./models/User');

const ACTION = 'CLIENT_MY_PUT_UPDATE_MY_PROFILE';

module.exports = async (req, res, next) => {
  try {
    const token = await authToken(req, ACTION, { required: true });
    const body = validate(req.body);

    // gen update params
    const { userId } = token;
    const doc = { $set: body };
    const opts = { new: true };

    // update user
    const user = await User.findByIdAndUpdate(userId, doc, opts);

    if (!user) {
      throw new ResponseError(404, 'user not found');
    }

    res.send({ user: user.toJSON() });
  }

  catch (err) {
    handleError(res, err);
  }
};
