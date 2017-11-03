const handleError = reqlib('./utils/response/handleError');
const cacheKey = reqlib('./redis/keys/client/user');
const createClient = reqlib('./redis/createClient');
const authToken = reqlib('./utils/token/auth/user');

const User = reqlib('./models/User');

const ACTION = 'CLIENT_MY_DEL_LOGOUT';

module.exports = async (req, res, next) => {
  try {
    const token = await authToken(req, ACTION, { required: true });
    const { apiKey, userId } = token;
    const client = createClient();
    const multi = client.multi();

    await multi
      .del(cacheKey(apiKey))
      .del(cacheKey(userId))
      .execAsync();

    await client.quitAsync();

    res.send({ message: 'ok' });
  }

  catch (err) {
    handleError(res, err);
  }
};
