const validateObjectId = reqlib('./utils/validate-objectid');
const handleResult = reqlib('./utils/response/handleResult');
const handleError = reqlib('./utils/response/handle-error');
const authToken = reqlib('./utils/keys/account/auth-token');
const injectProps = reqlib('./utils/model-injector/banner');
const createLog = reqlib('./utils/createAccountLog');
const validateBody = require('./validateBody');

const Banner = reqlib('./models/Banner');

const ACTION = 'ADMIN_BANNER_PUT_UPDATE_BANNER';

module.exports = (req, res, next) => {
  const log = createLog(req, ACTION);
  const reqAt = +new Date();

  authToken(config.apiActions[ACTION], req.header('authorization'))

    // add `accountId` to log
    .then(token => log.setAccountId(token))

    // validate `bannerId`
    .then(token => validateObjectId(req.params.bannerId))

    // validate body params
    .then(bannerId => (
      validateBody(req.body).then(body => ({ bannerId, body }))
    ))

    // update banner doc
    .then(({ bannerId, body }) => (
      Banner.findByIdAndUpdate(bannerId, { $set: body }, { new: true })
    ))

    // ensure banner exists
    .then(banner => (
      banner ? banner : Promise.reject(new ResponseError(404, 'banner not found'))
    ))

    // inject props
    .then(banner => injectProps(banner, 'toObject'))

    .then(banner => handleResult(res, { banner }, log, reqAt))
    .catch(err => handleError(res, err));
};
