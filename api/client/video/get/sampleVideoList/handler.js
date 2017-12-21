const map = require('lodash/map');

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

const props = require('./props');

const action = 'CLIENT_VIDEO_GET_SAMPLE_VIDEO_LIST';

module.exports = async (req, res, next) => {
  try {
    const token = await authToken(req, action, { required: false });
    const { limit } = req.query;
    const match = {
      ...genCond(req.query, props),
      publishAt: { $ne: null, $lte: new Date() },
      removeAt: null
    };

    if (!match.channelId) {
      match.channelId = { $in: await fetchPublishedChannels() };
    }

    if (!match.categoryId) {
      match.categoryId = { $in: await fetchPublishedCategories() };
    }

    let videos = await injectVideo(
      map(
        await Video.aggregate().match(match).sample(limit),
        video => new Video(video)
      ),
      { token }
    );

    await incVideoViews(videos);

    res.send({ videos });
  }

  catch (err) {
    handleError(res, err);
  }
};
