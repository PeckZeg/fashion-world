const handleError = reqlib('./utils/response/handleError');
const genKeys = reqlib('./utils/token/user/genKeys');

const User = reqlib('./models/User');

module.exports = async (req, res, next) => {
  console.log(req.baseUrl, req.route.path);
  try {
    const cond = req.body;
    const user = await User.findOne(cond).exec();

    if (!user) {
      throw new ResponseError(404, 'user not found');
    }

    res.send(await genKeys(user));
  }

  catch (err) {
    handleError(res, err);
  }
};
