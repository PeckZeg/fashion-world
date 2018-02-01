const handleResult = require('utils/response/handleResult');
const handleError = require('utils/response/handle-error');
const injectBanner = require('utils/models/inject/banner');
const authToken = require('utils/token/auth/account');
const createLog = require('utils/createAccountLog');

const Banner = require('models/Banner');

const action = 'ADMIN_BANNER_POST_CREATE_BANNER';

module.exports = async function(req, res, next) {
  try {
    const log = createLog(req, action);
    const token = await authToken(req, action, { log });
    let banner = new Banner(req.body);

    banner = await injectBanner(await banner.save(), { handler: 'toObject' });

    handleResult(res, { banner }, log);
  }

  catch (err) {
    handleError(res, err);
  }
};
