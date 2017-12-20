const incVideoViews = require('utils/models/video/incViews');
const handleError = require('utils/response/handle-error');
const injectVideo = require('utils/models/inject/video');

const Video = require('models/Video');

module.exports = async (req, res, next) => {
  try {
    const { videoId } = req.params;
    let video = await Video.findById(videoId);

    if (!video || !video.publishAt || video.removeAt) {
      throw new ResponseError(404, 'video not found');
    }

    video = await injectVideo(video);

    await incVideoViews(video);

    res.send({ video });
  }

  catch (err) {
    handleError(res, err);
  }
};
