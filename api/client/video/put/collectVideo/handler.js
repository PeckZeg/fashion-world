const isPublished = require('utils/models/video/isPublished');
const handleError = require('utils/response/handleError');
const authToken = require('utils/token/auth/user');
const createClient = require('redis/createClient');

const Video = require('models/Video');

const action = 'CLIENT_VIDEO_PUT_COLLECT_VIDEO';

module.exports = async (req, res, next) => {
  try {
    const token = await authToken(req, action, { required: true });
    const { userId } = token;
    const { videoId } = req.params;
    const video = await Video.findById(videoId);

    if (!await isPublished(video)) {
      throw new ResponseError(404, 'video not found');
    }

    const client = createClient();
    const multi = client.multi();
    const value = JSON.stringify({ collectAt: +new Date() });

    // add `userId` to `videoId` collections
    multi.hsetnx(
      require('redis/keys/client/video/collectedUsers')(videoId),
      userId.toString(),
      value
    );

    // add `videoId` to `userId` video collections
    multi.hsetnx(
      require('redis/keys/client/user/collectedVideos')(userId),
      videoId.toString(),
      value
    );

    await multi.execAsync();
    await client.quitAsync();

    res.send({ video });
  }

  catch (err) {
    handleError(res, err);
  }
};
