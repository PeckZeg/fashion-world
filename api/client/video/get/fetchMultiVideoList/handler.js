const compact = require('lodash/compact');
const flatten = require('lodash/flatten');
const uniq = require('lodash/uniq');
const omit = require('lodash/omit');
const map = require('lodash/map');

const fetchPublishedCategories = require('cache/publishedCategories');
const fetchPublishedChannels = require('cache/publishedChannels');

const genPaginaiton = require('utils/schema/model/genPaginaiton');
const injectCategory = require('utils/models/inject/category');
const incVideoViews = require('utils/models/video/incViews');
const handleError = require('utils/response/handle-error');
const injectVideo = require('utils/models/inject/video');
const genCond = require('utils/schema/model/genCond');
const genSort = require('utils/schema/model/genSort');
const mapObjectIds = require('utils/map-objectids');
const authToken = require('utils/token/auth/user');

const Category = require('models/Category');
const Video = require('models/Video');

const action = 'CLIENT_VIDEO_GET_FETCH_MULTI_VIDEO_LIST';
const props = require('./props');

module.exports = async function(req, res, next) {
  try {
    const token = await authToken(req, action, { required: false });
    const { channelId } = req.query;
    const { videoLimit, recommendAt, ...query } = req.query;
    const categoryId = compact(uniq(map(
      await Video.mapReduce({
        ...channelId ? { query: { channelId } } : null,
        resolveToObject: true,
        map: function() { emit(this.categoryId, 1); },
        reduce: function(k, vals) { return vals.length; }
      }).then(({ model }) => model),
      '_id'
    )));
    const { limit, skip } = genPaginaiton(req.query);
    const cond = {
      _id: { $in: mapObjectIds(categoryId) },
      ...genCond(query, props),
      publishAt: { $lte: new Date() },
      removeAt: null
    };
    const sort = { priority: -1, publishAt: -1, createAt: -1 };
    const total = await Category.count(cond);
    let categories = await injectCategory(
      await Category.find(cond).skip(skip).limit(limit).sort(sort)
    );

    categories = await Promise.all(categories.map(async category => {
      const { channelId, _id: categoryId } = category;
      const cond = {
        ...recommendAt ? { recommendAt } : null,
        channelId,
        categoryId,
        publishAt: { $ne: null, $lte: new Date() },
        removeAt: null
      };
      let sort = { priority: -1, publishAt: -1, createAt: -1 };

      if (cond.recommendAt) {
        sort = { recommendAt: -1, ...sort };
      }

      return {
        ...category,
        videos: await injectVideo(
          await Video.find(cond).limit(videoLimit).sort(sort),
          { token }
        )
      };
    }));

    await incVideoViews(flatten(map(categories, 'videos')));

    res.send({ total, categories });
  }

  catch (err) {
    handleError(res, err);
  }
};
