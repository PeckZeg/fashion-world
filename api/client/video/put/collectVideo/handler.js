const isPublished = require('utils/models/video/isPublished');
const handleError = require('utils/response/handleError');
const injectVideo = require('utils/models/inject/video');
const authToken = require('utils/token/auth/user');
const createClient = require('redis/createClient');

const Video = require('models/Video');

const action = 'CLIENT_VIDEO_PUT_COLLECT_VIDEO';

module.exports = async (req, res, next) => {
  try {
    const token = await authToken(req, action, { required: true });
    const { userId } = token;
    const { videoId } = req.params;
    let video = await Video.findById(videoId);

    if (!await isPublished(video)) {
      throw new ResponseError(404, 'video not found');
    }

    const client = createClient();
    const multi = client.multi();
    const collectAt = +new Date() + '';

    // add `userId` to `videoId` collections
    multi.zadd(
      require('redis/keys/client/video/collectedUsers')(videoId),
      collectAt,
      userId.toString()
    );

    // add `videoId` to `userId` video collections
    multi.zadd(
      require('redis/keys/client/user/collectedVideos')(userId),
      collectAt,
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
