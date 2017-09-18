const validateObjectId = reqlib('./utils/validate-objectid');
const handleResult = reqlib('./utils/response/handleResult');
const handleError = reqlib('./utils/response/handle-error');
const authToken = reqlib('./utils/keys/account/auth-token');
const injectProps = reqlib('./utils/model-injector/banner');
const createLog = reqlib('./utils/createAccountLog');

const Banner = reqlib('./models/Banner');

const ACTION = 'ADMIN_BANNER_DEL_BLOCK_BANNER';

module.exports = (req, res, next) => {
  const log = createLog(req, ACTION);
  const reqAt = +new Date();

  authToken(config.apiActions[ACTION], req.header('authorization'))

    // add `accountId` to log
    .then(token => log.setAccountId(token))

    // validate `bannerId`
    .then(token => validateObjectId(req.params.bannerId))

    // query banner doc
    .then(bannerId => Banner.findById(bannerId))

    // ensure banner exists
    .then(banner => {
      if (!banner) {
        return Promise.reject(new ResponseError(404, 'banner not found'));
      }

      if (!banner.publishAt) {
        return Promise.reject(new ResponseError(403, 'banner has been blocked'));
      }

      const doc = {
        $set: {
          publishAt: null
        }
      };

      return Banner.findByIdAndUpdate(banner._id, doc, { new: true });
    })

    // inject props
    .then(banner => injectProps(banner, 'toObject'))

    .then(banner => handleResult(res, { banner }, log, reqAt))
    .catch(err => handleError(res, err));
};
