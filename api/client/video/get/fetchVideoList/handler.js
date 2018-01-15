const fetchPublishedCategories = require('cache/publishedCategories');
const fetchPublishedChannels = require('cache/publishedChannels');

const genPaginaiton = require('utils/schema/model/genPaginaiton');
const incVideoViews = require('utils/models/video/incViews');
const handleError = require('utils/response/handle-error');
const injectVideo = require('utils/models/inject/video');
const genCond = require('utils/schema/model/genCond');
const genSort = require('utils/schema/model/genSort');
const authToken = require('utils/token/auth/user');

const Video = require('models/Video');

const action = 'CLIENT_VIDEO_GET_FETCH_VIDEO_LIST';
const props = require('./props');

module.exports = async (req, res, next) => {
  try {
    const token = await authToken(req, action, { required: false });
    const { limit, skip } = genPaginaiton(req.query);
    const cond = {
      ...genCond(req.query, props),
      publishAt: { $ne: null, $lte: new Date() },
      removeAt: null

      // $or: [
      //   {
      //     removeAt: null
      //   },
      //   {
      //     removeAt: { $exists: false }
      //   }
      // ]
    };

    if (!cond.channelId) {
      cond.channelId = { $in: await fetchPublishedChannels() };
    }

    // if (!cond.categoryId) {
    //   cond.categoryId = { $in: await fetchPublishedCategories() };
    // }

    let sort = { priority: -1, publishAt: -1, createAt: -1 };

    if (cond.recommendAt) {
      sort = { recommendAt: -1, ...sort };
    }

    const total = await Video.count(cond);
    const videos = await injectVideo(
      await Video.find(cond).skip(skip).limit(limit).sort(sort),
      { token }
    );

    await incVideoViews(videos);

    res.send({ total, videos });
  }

  catch (err) {
    handleError(res, err);
  }
};
