const isPublished = require('utils/models/video/isPublished');
const handleError = require('utils/response/handle-error');
const injectVideo = require('utils/models/inject/video');
const incViews = require('utils/models/video/incViews');

const Video = require('models/Video');

module.exports = async (req, res, next) => {
  try {
    const { videoId } = req.params;
    let video = await Video.findById(videoId);

    if (!(await isPublished(video))) {
      throw new ResponseError(404, 'video not found');
    }

    video = await injectVideo(video);

    await incViews(video);

    res.send({ video });
  }

  catch (err) {
    handleError(res, err);
  }
};
