const isPublished = require('utils/models/video/isPublished');
const handleError = require('utils/response/handleError');
const injectVideo = require('utils/models/inject/video');
const authToken = require('utils/token/auth/user');
const createClient = require('redis/createClient');

const Video = require('models/Video');

const action = 'CLIENT_VIDEO_PUT_FAVOUR_VIDEO';

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
    const favourAt = +new Date() + '';

    // add `userId` to `videoId` favourite users
    multi.zadd(
      require('redis/keys/client/video/favouriteUsers')(videoId),
      favourAt,
      userId.toString()
    );

    // add `videoId` to `userId` favourite videos
    multi.zadd(
      require('redis/keys/client/user/favouriteVideos')(userId),
      favourAt,
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
