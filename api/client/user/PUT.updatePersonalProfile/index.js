const cacheKey = reqlib('./redis/keys')('client:user:favourite-videos');
const handleError = reqlib('./utils/response/handle-error');
const injectVideos = reqlib('./utils/model-injector/video');
const authToken = reqlib('./utils/keys/user/auth-token');
const createClient = reqlib('./redis/create-client');
const validateParams = require('./validateParams');

const User = reqlib('./models/User');

const { ObjectId } = require('mongoose').Types;
const ACTION = config.apiActions['client:user:put:update-personal-profile'];

module.exports = (req, res, next) => {
  authToken(ACTION, req.header('authorization'), true)

    // validate body params
    .then(token => (
      validateParams(req.body).then(body => ({ token, body }))
    ))

    // generate update params
    .then(({ token, body }) => {
      const { userId } = token;
      const doc = { $set: body };
      const opts = { new: true };

      return { userId, doc, opts };
    })

    // update user
    .then(({ userId, doc, opts }) => User.findByIdAndUpdate(userId, doc, opts))

    // check user exists
    .then(user => {
      if (!user) {
        return Promise.reject(new ResponseError(404, 'user not found'));
      }

      return user.toJSON();
    })

    .then(user => res.send({ user }))
    .catch(err => handleError(res, err));
};
