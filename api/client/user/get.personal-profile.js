const auth = reqlib('./utils/access-keys/user/auth');
const User = reqlib('./models/User');
const CaaError = reqlib('./utils/CaaError');

const ACTION = config.apiActions['user.get.personal-profile'];

module.exports = (req, res, next) => {
  auth(req.header('authorization'), ACTION, false)
    .then(keys => User.findById(keys.userId))
    .then(user => {
      if (!user) return reject(CaaError(404, 'user not found'));

      res.send({ user });
    })
    .catch(err => res.status(err.status || 500).send({ message: err.message }));
};
