const validateParams = reqlib('./validate-models/client/video/search-query-params');
const injectVideos = reqlib('./utils/models/inject/videos');
const handleError = reqlib('./utils/response/handle-error');

const Video = reqlib('./models/Video');

module.exports = (req, res, next) => {
  Promise.resolve(req.query)

    // validate query params
    .then(validateParams)

    // generate query doc params
    .then(({ offset, limit, q }) => {
      const name = new RegExp(q, 'gi');
      const cond = {
        name,
        publishAt: { $ne: null },
        removeAt: null
      };
      const skip = offset * limit;
      const sort = { publishAt: -1, createAt: -1 };

      return { cond, limit, skip, sort };
    })

    // query video docs
    .then(({ cond, skip, limit, sort }) => (
      Video.find(cond).skip(skip).limit(limit).sort(sort)
        .then(videos => ({ cond, videos }))
    ))

    // inject videos
    .then(({ cond, videos }) => (
      injectVideos(videos).then(videos => ({ cond, videos }))
    ))

    // count video docs
    .then(({ cond, videos }) => (
      Video.count(cond).then(total => ({ total, videos }))
    ))

    // send result
    .then(result => res.send(result))

    .catch(err => handleError(res, err));
};
