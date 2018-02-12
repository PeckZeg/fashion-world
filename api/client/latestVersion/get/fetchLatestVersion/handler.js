const handleError = require('utils/response/handle-error');

const Version = require('models/Version');

module.exports = async function(req, res, next) {
  try {
    const { type, current } = req.query;
    let [major, minor, revision] = current.split('.').map(v => +v);
    let version = await Version.findOne({
      type,
      $or: [
        {
          'version.major': major,
          'version.minor': minor,
          'version.revision': { $gt: revision }
        },
        {
          'version.major': major,
          'version.minor': { $gt: minor }
        },
        {
          'version.major': { $gt: major },
        }
      ]
    }).sort({
      'version.major': -1,
      'version.minor': -1,
      'version.revision': -1,
      publishAt: -1,
      createAt: -1
    });

    version = version && version.toJSON();

    res.send({ version });
  }

  catch (err) {
    handleError(res, err);
  }
};
