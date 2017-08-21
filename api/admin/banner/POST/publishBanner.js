const validateObjectId = reqlib('./utils/validate-objectid');
const handleError = reqlib('./utils/response/handle-error');
const authToken = reqlib('./utils/keys/account/auth-token');

const Banner = reqlib('./models/Banner');

const ACTION = config.apiActions['admin:banner:post:publish-banner'];
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

      if (banner.publishAt) {
        return Promise.reject(new ResponseError(403, 'banner has been published'));
      }

      const doc = {
        $set: {
          publishAt: new Date(),
          removeAt: null
        }
      };

      return Banner.findByIdAndUpdate(banner._id, doc, OPTS);
    })

    // transform banner
    .then(banner => banner.toObject())

    .then(banner => res.send({ banner }))
    .catch(err => handleError(res, err));
};
