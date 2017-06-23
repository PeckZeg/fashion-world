const auth = reqlib('./utils/access-keys/account/auth');
const VideoChannel = reqlib('./models/VideoChannel');
const transformQuery = reqlib('./utils/transform-query');
const validateParams = reqlib('./validate-models/admin/video-channel/fetch-list-query-params');
const handleError = reqlib('./utils/response/handle-error');

const ACTION = config.apiActions['admin:video-channel:get:fetch-list'];
const MODEL_QUERY_COND = {
  isRemoved: 'removeAt'
};

module.exports = (req, res, next) => {
  auth(req.header('authorization'), ACTION, false)

    .then(result => res.send(result))
    .catch(err => handleError(res, err));
};
