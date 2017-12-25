const includes = require('lodash/includes');
const compact = require('lodash/compact');
const filter = require('lodash/filter');
const keyBy = require('lodash/keyBy');
const size = require('lodash/size');
const map = require('lodash/map');

const fetchPublishedCategories = require('cache/publishedCategories');
const fetchPublishedChannels = require('cache/publishedChannels');
const fetchPublishedVideos = require('cache/publishedVideos');

const genPaginaiton = require('utils/schema/model/genPaginaiton');
const handleError = reqlib('./utils/response/handleError');
const injectVideo = require('utils/models/inject/video');
const genCond = require('utils/schema/model/genCond');
const genSort = require('utils/schema/model/genSort');
const cacheKey = reqlib('./redis/keys/client/user');
const createClient = reqlib('./redis/createClient');
const authToken = reqlib('./utils/token/auth/user');

const Video = require('models/Video');
const User = require('models/User');

const action = 'CLIENT_MY_GET_FETCH_FAVOURITE_VIDEOS';
const props = require('./props');

module.exports = async (req, res, next) => {
  try {
    const token = await authToken(req, action, { required: true });
    const { userId } = token;
    let user = await User.findById(userId).exec();

    if (!user) {
      throw new ResponseError(404, 'user not found');
    }

    const client = createClient();

    let videoIds = filter(
      await client.zrevrangeAsync(
        require('redis/keys/client/user/favouriteVideos')(userId),
        0, -1
      ),
      videoId => includes(publishedVideos, videoId)
    );

    const cond = {
      ...genCond(req.query, props),
      _id: { $in: videoIds },
      publishAt: { $ne: null, $lte: new Date() },
      removeAt: null
    };
    const videosById = keyBy(await Video.find(cond), '_id');
    const total = size(videosById);
    const { offset, limit } = req.query;

    let videos = compact(map(videoIds, videoId => videosById[videoId]));

    videos = await injectVideo(
      videos.slice(offset * limit, (offset + 1) * limit),
      { token }
    );

    await client.quitAsync();

    res.send({ total, videos });
  }

  catch (err) {
    handleError(res, err);
  }
};
