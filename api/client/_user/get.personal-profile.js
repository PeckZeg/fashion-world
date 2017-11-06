const handleError = reqlib('./utils/response/handle-error');
const authToken = reqlib('./utils/keys/user/auth-token');

const User = reqlib('./models/User');

const ACTION = config.apiActions['user.get.personal-profile'];

module.exports = (req, res, next) => {
  authToken(ACTION, req.header('authorization'), true)

    // query user doc
    .then(({ userId }) => User.findById(userId).exec())

    // check user exists
    .then(user => {
      if (!user) {
        return Promise.reject(new ResponseError(404, 'user not found'));
      }

      return user;
    })

    // transform user to json
    .then(user => user.toJSON())

    .then(user => res.send({ user }))
    .catch(err => handleError(res, err));
};
