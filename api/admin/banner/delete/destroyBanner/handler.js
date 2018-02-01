const injectCategory = require('utils/models/inject/category');
const handleResult = require('utils/response/handleResult');
const injectBanner = require('utils/models/inject/banner');
const handleError = require('utils/response/handle-error');
const authToken = require('utils/token/auth/account');
const createLog = require('utils/createAccountLog');

const Banner = require('models/Banner');

const action = 'ADMIN_BANNER_DEL_DESTROY_BANNER';

module.exports = async (req, res, next) => {
  try {
    const log = createLog(req, action);
    const token = await authToken(req, action, { log });
    const { bannerId } = req.params;
    let banner = await Banner.findById(bannerId, 'removeAt');

    if (!banner) {
      throw new ResponseError(404, 'banner not found');
    }

    if (banner.removeAt) {
      throw new ResponseError(403, 'banner has been removed');
    }

    const doc = { $set: { publishAt: null, removeAt: new Date() } };
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
