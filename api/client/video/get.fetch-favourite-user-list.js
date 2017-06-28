const validateParams = reqlib('./validate-models/client/video/fetch-list-query-params');
const handleError = reqlib('./utils/response/handle-error');
const injectVideos = reqlib('./utils/models/inject/videos');
const transformQuery = reqlib('./utils/transform-query');
const auth = reqlib('./utils/access-keys/user/auth');

const Video = reqlib('./models/Video');

module.exports = (req, res, next) => {
  res.send({ a: 1 });
};
