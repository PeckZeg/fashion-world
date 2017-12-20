const fetchPublishedCategories = require('cache/publishedCategories');
const genPaginaiton = require('utils/schema/model/genPaginaiton');
const fetchPublishedChannels = require('cache/publishedChannels');
const incVideoViews = require('utils/models/video/incViews');
const handleError = require('utils/response/handle-error');
const injectVideo = require('utils/models/inject/video');
const genCond = require('utils/schema/model/genCond');
const genSort = require('utils/schema/model/genSort');

const Video = require('models/Video');

const props = require('./props');

module.exports = async (req, res, next) => {
  try {
    const { limit, skip } = genPaginaiton(req.query);
    const cond = {
      ...genCond(req.query, props),
      publishAt: { $ne: null, $lte: new Date() },
      removeAt: null
    };

    if (!cond.channelId) {
      cond.channelId = { $in: await fetchPublishedChannels() };
    }

    if (!cond.categoryId) {
      cond.categoryId = { $in: await fetchPublishedCategories() };
    }

    const sort = { priority: -1, publishAt: -1, createAt: -1 };
    const total = await Video.count(cond);
    const videos = await injectVideo(
      await Video.find(cond).skip(skip).limit(limit).sort(sort)
    );

    await incVideoViews(videos);

    res.send({ total, videos });
  }

  catch (err) {
    handleError(res, err);
  }
};
