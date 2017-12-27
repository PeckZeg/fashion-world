const handleError = require('utils/response/handleError');
const cacheKey = require('redis/keys/client/sms/sent');
const createClient = require('redis/createClient');

module.exports = async (req, res, next) => {
  try {
    const { mobile, code } = req.body;
    const client = createClient();
    const key = cacheKey(mobile);
    const validateCode = await client.getAsync(key);

    if (!validateCode) {
      throw new ResponseError(404, 'code is not sent');
    }

    if (validateCode !== code) {
      throw new ResponseError(403, 'invalid code');
    }

    await client.quitAsync();

    let result = { message: 'ok' };

    if (process.env.NODE_ENV !== 'production') {
      Object.assign(result, { mobile, code, validateCode });
    }

    res.send(result);
  }

  catch (err) {
    handleError(res, err);
  }
};
