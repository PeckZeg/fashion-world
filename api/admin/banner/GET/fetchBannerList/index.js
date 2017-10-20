const handleResult = reqlib('./utils/response/handleResult');
const handleError = reqlib('./utils/response/handle-error');
const authToken = reqlib('./utils/token/auth/account');
const createLog = reqlib('./utils/createAccountLog');

const injectProps = reqlib('./utils/model-injector/banner');
const injectVideoProps = reqlib('./utils/model-injector/video');
const transformQuery = require('./transformQuery');
const validateQuery = require('./validateQuery');
const { mergeQueryCond, setSort } = reqlib('./utils/api-model')(require('./props'));

const Banner = reqlib('./models/Banner');
const Video  = reqlib('./models/Video');

const action = 'ADMIN_BANNER_GET_FETCH_BANNER_LIST';

module.exports = (req, res, next) => {
  const log = createLog(req, action);

  authToken(req, action, { log })

    // transform query params
    .then(token => transformQuery(req.query))

    // validate query params
    .then(validateQuery)

    // generate query params
    .then(query => {
      const { offset, limit } = query;
      const skip = offset * limit;
      let cond = {};
      let sort = { createAt: -1 };

      cond = mergeQueryCond(cond, query);
      sort = setSort(sort, query);

      return { cond, skip, limit, sort };
    })

    // query banner docs
    .then(({ cond, skip, limit, sort }) => (
      Banner.find(cond).skip(skip).limit(limit).sort(sort)
        .then(banners => injectProps(banners, 'toObject'))
        .then(banners => ({ cond, banners }))
    ))

    // get videoId
    .then(({ cond, banners }) => (
      Video.find({
        _id: _.chain(banners).map('value.videoId').compact().uniq().value()
      })
        .then(videos => injectVideoProps(null, videos, 'toObject'))
        .then(videos => {
          videos = _.keyBy(videos, '_id');

          banners.forEach(banner => {
            const videoId = _.get(banner, 'value.videoId');

            if (videoId && videos[videoId] !== void 0) {
              banner.video = videos[videoId];
            }
          });

          return { cond, banners };
        })
    ))

    // count banner docs
    .then(({ cond, banners }) => (
      Banner.count(cond).then(total => ({ total, banners }))
    ))

    .then(result => handleResult(res, result, log))
    .catch(err => handleError(res, err));
};
