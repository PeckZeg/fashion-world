const handleResult = reqlib('./utils/response/handleResult');
const handleError = reqlib('./utils/response/handle-error');
const authToken = reqlib('./utils/token/auth/account');
const createLog = reqlib('./utils/createAccountLog');

const injectProps = reqlib('./utils/model-injector/banner');
const injectVideoProps = reqlib('./utils/model-injector/video');

const Banner = reqlib('./models/Banner');
const Video  = reqlib('./models/Video');

const ACTION = 'ADMIN_BANNER_GET_FETCH_BANNER_PROFILE';

module.exports = async (req, res, next) => {
  try {
    const log = createLog(req, ACTION);
    const token = await authToken(req, ACTION, { log });
    const bannerId = validateObjectId(req.params.bannerId);
    let banner = await Video.findById(bannerId);

    if (!banner) {
      throw new ResponseError(404, 'banner not found');
    }

    banner = await injectProps(banner, 'toObject');

    const videoId = _.get(banner, 'value.videoId');

    if (videoId) {
      let video = await Video.findById(videoId);
      video = await injectVideoProps(null, video, 'toObject');
      banner.video = video;
    }

    handleResult(res, { banner }, log);
  }

  catch (err) {
    handleError(res, err);
  }
};
