const handleResult = reqlib('./utils/response/handleResult');
const handleError = reqlib('./utils/response/handle-error');
const authToken = reqlib('./utils/token/auth/account');
const createLog = reqlib('./utils/createAccountLog');

const validateObjectId = reqlib('./utils/validate-objectid');
const injectProps = reqlib('./utils/model-injector/banner');

const Banner = reqlib('./models/Banner');

const action = 'ADMIN_BANNER_POST_PUBLISH_BANNER';

module.exports = (req, res, next) => {
  const log = createLog(req, action);

  authToken(req, action, { log })

    // validate `bannerId`
    .then(token => validateObjectId(req.params.bannerId))

    // query banner doc
    .then(bannerId => Banner.findById(bannerId))

    // ensure banner exists
    .then(banner => {
      if (!banner) {
        return Promise.reject(
          new ResponseError(404, 'banner not found')
        );
      }

      if (banner.publishAt) {
        return Promise.reject(
          new ResponseError(403, 'banner has been published')
        );
      }

      const doc = {
        $set: {
          publishAt: new Date(),
          removeAt: null
        }
      };

      return Banner.findByIdAndUpdate(banner._id, doc, { new: true });
    })

    // inject props
    .then(banner => injectProps(banner, 'toObject'))

    .then(banner => handleResult(res, { banner }, log))
    .catch(err => handleError(res, err));
};
