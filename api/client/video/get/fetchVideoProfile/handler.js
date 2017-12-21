const isPublished = require('utils/models/video/isPublished');
const handleError = require('utils/response/handle-error');
const injectVideo = require('utils/models/inject/video');
const incViews = require('utils/models/video/incViews');
const authToken = require('utils/token/auth/user');

const Video = require('models/Video');

const action = 'CLIENT_VIDEO_GET_FETCH_VIDEO_PROFILE';

module.exports = async (req, res, next) => {
  try {
    const token = await authToken(req, action, { required: false });
    const { videoId } = req.params;
    let video = await Video.findById(videoId);

    if (!await isPublished(video)) {
      throw new ResponseError(404, 'video not found');
    }

    video = await injectVideo(video, { token });

    await incViews(video);

    res.send({ video });
  }

  catch (err) {
    handleError(res, err);
  }
};
