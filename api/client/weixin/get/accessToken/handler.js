const fetchAccessToken = require('utils/weixin/fetchAccessToken');
const handleError = require('utils/response/handleError');

module.exports = async (req, res, next) => {
  try {
    const { type, code } = req.query;
    const weixin = await fetchAccessToken(type, code);

    res.send(weixin);
  }

  catch (err) {
    handleError(res, err);
  }
};
