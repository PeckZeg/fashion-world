const handleError = require('utils/response/handleError');
const cacheKey = require('redis/keys/client/sms/sent');
const createClient = require('redis/createClient');

const User = require('models/User');

module.exports = async (req, res, next) => {
  try {
    const { mobile, password, code } = req.body;
    const client = createClient();
    const key = cacheKey(mobile);
    const validateCode = await client.getAsync(key);

    if (!validateCode) {
      throw new ResponseError(404, 'code is not sent');
    }

    if (validateCode !== code) {
      throw new ResponseError(403, 'invalid code');
    }

    const userCount = await User.count({ mobile });

    if (process.env.NODE_ENV === 'production' && userCount) {
      throw new ResponseError(403, 'user exists');
    }

    const cond = { mobile };
    const doc = {
      $set: {
        mobile,
        name: `用户 ${mobile.slice(-4)}`,
        password
      }
    };
    const opts = { new: true, upsert: true };
    const user = await User.findOneAndUpdate(cond, doc, opts);

    await client.delAsync(key);
    await client.quitAsync();

    res.send({ user: user.toJSON() });
  }

  catch (err) {
    handleError(res, err);
  }
};
