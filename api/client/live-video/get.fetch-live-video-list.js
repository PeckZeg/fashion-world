const LiveVideo = reqlib('./models/LiveVideo');

const injectLiveVideos = reqlib('./utils/models/inject/liveVideos');
const validateParams = reqlib('./validate-models/client/live-video/fetch-list-query-params');
const handleError = reqlib('./utils/response/handle-error');

module.exports = (req, res, next) => {
  Promise.resolve(req.query)

    // validate query params
    .then(validateParams)

    // generate query options
    .then(query => {
      const { limit } = query;
      const match = {
        $or: [
          { recommendBeginAt: { $ne: null, $lte: new Date() } },
          { recommendEndAt: { $ne: null, $gte: new Date() } }
        ],
        publishAt: { $ne: null, $lte: new Date() },
        removeAt: { $eq: null }
      };

      return { match, limit };
    })

    // query recommend live video docs
    .then(({ match, limit, sort }) => (
      LiveVideo.aggregate().match(match).sample(limit).exec()
        .then(liveVideos => ({
          liveVideos: liveVideos.map(liveVideo => new LiveVideo(liveVideo)),
          limit
        }))
    ))

    // generate query live video params
    .then(({ liveVideos, limit: globalLimit }) => {
      const limit = globalLimit - liveVideos.length;
      const match = {
        sourceId: { $nin: _.map(liveVideos, 'sourceId') },
        recommendBeginAt: { $eq: null },
        recommendEndAt: { $eq: null },
        publishAt: { $ne: null, $lte: new Date() },
        removeAt: { $eq: null }
      };

      return { liveVideos, match, limit };
    })

    // query live video docs
    .then(({ liveVideos, match, limit }) => (
      LiveVideo.aggregate().match(match).sample(limit).exec()
        .then(concatLiveVideos => [
          ...liveVideos,
          ...concatLiveVideos.map(liveVideo => new LiveVideo(liveVideo))
        ])
    ))

    // shuffle video docs
    .then(liveVideos => _.shuffle(liveVideos))

    // inject live video docs
    .then(injectLiveVideos)

    .then(liveVideos => res.send({ liveVideos }))
    .catch(err => handleError(res, err));
};
