const cacheKey = require('scripts/migrateVideo/keys/defitions')();
const handleError = require('utils/response/handleError');
const createClient = require('redis/createClient');

module.exports = async (req, res, next) => {
  try {
    const { inputKey } = req.body;
    const client = createClient();
    const key = inputKey.toString();
    const value = JSON.stringify(req.body);
    const result = await client.saddAsync(cacheKey, key, value);

    res.send({ result });
  }

  catch (err) {
    handleError(err);
  }
};
