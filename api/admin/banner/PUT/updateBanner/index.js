const validateObjectId = reqlib('./utils/validate-objectid');
const handleError = reqlib('./utils/response/handle-error');
const authToken = reqlib('./utils/keys/account/auth-token');
const validateBody = require('./validateBody');

const Banner = reqlib('./models/Banner');

const ACTION = config.apiActions['admin:banner:put:update-banner'];
const OPTS = { new: true };

module.exports = (req, res, next) => {
  authToken(ACTION, req.header('authorization'))

    // validate `bannerId`
    .then(token => validateObjectId(req.params.bannerId))

    // validate body params
    .then(bannerId => (
      validateBody(req.body).then(body => ({ bannerId, body }))
    ))

    // update banner doc
    .then(({ bannerId, body }) => (
      Banner.findByIdAndUpdate(bannerId, { $set: body }, OPTS)
    ))

    // ensure banner exists
    .then(banner => {
      if (!banner) {
        return Promise.reject(new ResponseError(404, 'banner not found'));
      }

      return banner.toObject();
    })

    .then(banner => res.send({ banner }))
    .catch(err => handleError(res, err));
};
