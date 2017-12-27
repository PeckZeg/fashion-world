const handleError = require('utils/response/handle-error');

const About = require('models/About');

module.exports = async function(req, res, next) {
  try {
    const cond = {
      publishAt: { $ne: null, $lte: new Date() },
      removeAt: null
    };
    const sort = { priority: -1, publishAt: -1, createAt: -1 };
    const total = await About.count(cond);
    const about = await About.find(cond).sort(sort);

    res.send({ total, about });
  }

  catch (err) {
    handleError(res, err);
  }
};
