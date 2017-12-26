const handleError = require('utils/response/handle-error');

const Banner = require('models/Banner');

module.exports = async (req, res, next) => {
  try {
    const { bannerId } = req.params;
    const banner = await Banner.findById(bannerId);

    if (!banner || !banner.publishAt || banner.removeAt) {
      throw new ResponseError(404, 'banner not found');
    }

    res.send({ banner });
  }

  catch (err) {
    handleError(res, err);
  }
};
