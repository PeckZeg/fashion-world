const validateObjectId = reqlib('./utils/validate-objectid');
const handleError = reqlib('./utils/response/handle-error');
const authToken = reqlib('./utils/keys/account/auth-token');
const injectProps = reqlib('./utils/model-injector/banner');

const Banner = reqlib('./models/Banner');

const ACTION = config.apiActions['admin:banner:del:block-banner'];
const OPTS = { new: true };

module.exports = (req, res, next) => {
  authToken(ACTION, req.header('authorization'))

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

      return Banner.findByIdAndUpdate(banner._id, doc, OPTS);
    })

    // inject props
    .then(banner => injectProps(banner, 'toObject'))

    .then(banner => res.send({ banner }))
    .catch(err => handleError(res, err));
};
