const handleError = require('utils/response/handleError');
const cacheKey = require('redis/keys/client/sms/sent');
const createClient = require('redis/createClient');

const User = require('models/User');

module.exports = async (req, res, next) => {
  const client = createClient();

  try {
    const { mobile, password, code } = req.body;
    const key = require('redis/keys/client/sms/sent')(mobile);
    const validateCode = await client.getAsync(key);

    if (!validateCode) {
      throw new ResponseError(404, 'code is not sent');
    }

    if (validateCode !== code) {
      throw new ResponseError(403, 'invalid code');
    }

    const cond = { mobile };
    const doc = {
      $set: {
        password
      }
    };
    const opts = { new: true };
    const user = await User.findOneAndUpdate(cond, doc, opts);

    if (!user) {
      throw new ResponseError(404, 'user not found');
    }

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
