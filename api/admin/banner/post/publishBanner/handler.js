const handleResult = require('utils/response/handleResult');
const injectBanner = require('utils/models/inject/banner');
const handleError = require('utils/response/handle-error');
const authToken = require('utils/token/auth/account');
const createLog = require('utils/createAccountLog');

const Banner = require('models/Banner');

const action = 'ADMIN_BANNER_POST_PUBLISH_BANNER';

module.exports = async function(req, res, next) {
  try {
    const log = createLog(req, action);
    const token = await authToken(req, action, { log });
    const { bannerId } = req.params;
    let banner = await Banner.findById(bannerId, 'publishAt');

    if (!banner) {
      throw new ResponseError(404, 'banner not found');
    }

    if (banner.publishAt) {
      throw new ResponseError(403, 'banner has been published');
    }

    const { publishAt = new Date() } = req.body;
    const doc = { $set: { publishAt, removeAt: null } };
    const opts = { new: true };

    banner = await injectBanner(
      await Banner.findByIdAndUpdate(bannerId, doc, opts),
      { handler: 'toObject' }
    );

    handleResult(res, { banner }, log);
  }

  catch (err) {
    handleError(res, err);
  }
};
