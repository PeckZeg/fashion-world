const handleResult = require('utils/response/handleResult');
const injectBanner = require('utils/models/inject/banner');
const handleError = require('utils/response/handle-error');
const authToken = require('utils/token/auth/account');
const createLog = require('utils/createAccountLog');

const Banner = require('models/Banner');

const action = 'ADMIN_BANNER_GET_FETCH_BANNER_PROFILE';

module.exports = async function(req, res, next) {
  try {
    const log = createLog(req, action);
    const token = await authToken(req, action, { log });
    let { bannerId } = req.params;
    let banner = await Banner.findById(bannerId);

    if (!banner) {
      throw new ResponseError(404, 'banner not found');
    }

    banner = await injectBanner(banner, { handler: 'toObject' });

    handleResult(res, { banner }, log);
  }

  catch (err) {
    handleError(res, err);
  }
};
