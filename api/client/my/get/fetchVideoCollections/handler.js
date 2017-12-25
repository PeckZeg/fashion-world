const includes = require('lodash/includes');
const filter = require('lodash/filter');
const map = require('lodash/map');

const fetchPublishedCategories = require('cache/publishedCategories');
const fetchPublishedChannels = require('cache/publishedChannels');
const fetchPublishedVideos = require('cache/publishedVideos');

const genPaginaiton = require('utils/schema/model/genPaginaiton');
const handleError = reqlib('./utils/response/handleError');
const genCond = require('utils/schema/model/genCond');
const genSort = require('utils/schema/model/genSort');
const cacheKey = reqlib('./redis/keys/client/user');
const createClient = reqlib('./redis/createClient');
const authToken = reqlib('./utils/token/auth/user');

const Video = require('models/Video');
const User = require('models/User');

const action = 'CLIENT_MY_GET_FETCH_VIDEO_COLLECTIONS';
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

    const publishedVideos = await fetchPublishedVideos({ string: true });

    let videoIds = filter(
      [
        '5a384dc4982dd90a087072aa',
        ...await client.hkeysAsync(
          require('redis/keys/client/user/collectedVideos')(userId)
        )
      ],
      videoId => includes(publishedVideos, videoId)
    );

    const { limit, skip } = genPaginaiton(req.query);
    const cond = {
      ...genCond(req.query, props),
      _id: { $in: videoIds },
      publishAt: { $lte: new Date() },
      removeAt: null
    };
    const sort = { priority: -1, publishAt: -1, createAt: -1 };

    const queryVideos = map(
      await Video.find(cond, '_id').skip(skip).limit(limit).sort(sort),
      ({ _id }) => _id.toString()
    );

    res.send({ publishedVideos, queryVideos })
  }

  catch (err) {
    handleError(res, err);
  }
};
