const fetchUserInfo = require('utils/weixin/fetchUserInfo');
const handleError = require('utils/response/handleError');

module.exports = async function(req, res, next) {
  try {
    const { accessToken, openid } = req.query;

    res.send(await fetchUserInfo(accessToken, openid));
  }

  catch (err) {
    handleError(res, err);
  }
};
