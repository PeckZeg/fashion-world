const LiveVideo = reqlib('./models/LiveVideo');

const injectLiveVideos = reqlib('./utils/models/inject/liveVideos');
const validateParams = reqlib('./validate-models/client/live-video/fetchListqueryParams');
const handleError = reqlib('./utils/response/handle-error');

module.exports = (req, res, next) => {
  Promise.resolve(req.query)

    // validate query params
    .then(validateParams)

    // generate query options
    .then(query => {
      const { offset, limit } = query;
      const skip = offset * limit;
      const cond = {
        publishAt: { $ne: null, $lte: new Date() },
        removeAt: { $eq: null }
      };
      const sort = { priority: -1, createAt: -1 };

      return { cond, skip, limit, sort };
    })

    // query live video docs
    .then(({ cond, skip, limit, sort }) => (
      LiveVideo.find(cond).skip(skip).limit(limit).sort()
    ))

    // inject live video docs
    .then(injectLiveVideos)

    .then(liveVideos => res.send({ liveVideos }))
    .catch(err => handleError(res, err));
};
