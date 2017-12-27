const isPublished = require('utils/models/video/isPublished');
const handleError = require('utils/response/handleError');
const injectVideo = require('utils/models/inject/video');
const authToken = require('utils/token/auth/user');
const createClient = require('redis/createClient');

const Video = require('models/Video');

const action = 'CLIENT_VIDEO_DEL_DISSIPATE_VIDEO';

module.exports = async (req, res, next) => {
  try {
    const token = await authToken(req, action, { required: true });
    const userId = token.userId.toString();
    const videoId = req.params.videoId.toString();
    let video = await Video.findById(videoId);

    if (!await isPublished(video)) {
      throw new ResponseError(404, 'video not found');
    }

    const client = createClient();
    const multi = client.multi();

    // remove `userId` from video collections
    multi.zrem(
      require('redis/keys/client/video/collectedUsers')(videoId),
      userId.toString()
    );

    // remove `videoId` from user video collections
    multi.zrem(
      require('redis/keys/client/user/collectedVideos')(userId),
      videoId.toString()
    );

    await multi.execAsync();
    await client.quitAsync();

    video = await injectVideo(video, { token });

    res.send({ video });
  }

  catch (err) {
    handleError(res, err);
  }
};
