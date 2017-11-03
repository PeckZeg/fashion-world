const handleError = reqlib('./utils/response/handleError');
const genKeys = reqlib('./utils/token/user/genKeys');
const validate = require('./validate');

const User = reqlib('./models/User');

module.exports = async (req, res, next) => {
  try {
    const cond = await validate(req.body);
    const user = await User.findOne(cond).exec();

    if (!user) {
      throw new ResponseError(404, 'user not found');
    }

    res.send(await genKeys(user));
  }

  catch (err) {
    handleError(res, err);
  }
};
