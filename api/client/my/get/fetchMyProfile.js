const handleError = reqlib('./utils/response/handleError');
const cacheKey = reqlib('./redis/keys/client/user');
const createClient = reqlib('./redis/createClient');
const authToken = reqlib('./utils/token/auth/user');

const User = reqlib('./models/User');

const ACTION = 'CLIENT_MY_GET_FETCH_MY_PROFILE';

module.exports = async (req, res, next) => {
  try {
    const token = await authToken(req, ACTION, { required: true });
    const { userId } = token;
    let user = await User.findById(userId).exec();

    if (!user) {
      throw new ResponseError(404, 'user not found');
    }

    res.send({ user: user.toJSON() });
  }

  catch (err) {
    handleError(res, err);
  }
};
