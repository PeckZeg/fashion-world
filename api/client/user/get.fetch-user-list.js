const validateParams = reqlib('./validate-models/client/user/fetch-user-list-query-params');
const handleError = reqlib('./utils/response/handle-error');
const authToken = reqlib('./utils/keys/user/auth-token');

const User = reqlib('./models/User');

const ACTION = config.apiActions['client:user:get:fetch-user-list'];

module.exports = (req, res, next) => {
  authToken(ACTION, req.header('authorization'))

    // validate query params
    .then(token => (
      validateParams(req.query).then(query => ({ token, query }))
    ))

    // generate query params
    .then(({ token, query }) => {
      const { offset, limit } = query;
      const skip = offset * limit;
      let cond = {};
      let sort = { createAt: -1 };

      return { token, cond, skip, limit, sort };
    })

    // query user docs
    .then(({ token, cond, skip, limit, sort }) => (
      User.find(cond).skip(skip).limit(limit).sort(sort)
        .then(users => ({ token, users }))
    ))

    // transform users
    .then(({ token, users }) => users.map(user => user.toJSON()))

    .then(users => res.send({ users }))
    .catch(err => handleError(res, err));
};
