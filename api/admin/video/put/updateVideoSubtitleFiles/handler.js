const path = require('path');

const startsWith = require('lodash/startsWith');
const map = require('lodash/map');

const handleResult = require('utils/response/handleResult');
const handleError = require('utils/response/handle-error');
const injectVideo = require('utils/models/inject/video');
const authToken = require('utils/token/auth/account');
const createLog = require('utils/createAccountLog');
const mimeExt = require('utils/mimeExt');

const createBucketManager = require('utils/qiniu/createBucketManager');
const fetchFileSha1 = require('utils/qiniu/fetchFileSha1');
const fetchStat = require('utils/qiniu/fetchStat');

const Video = require('models/Video');

const action = 'ADMIN_VIDEO_PUT_UPDATE_VIDEO_SUBTITLE_FILES';
const { images: bucket } = config.qiniu.bucket;

module.exports = async function(req, res, next) {
  try {
    const log = createLog(req, action);
    const token = await authToken(req, action, { log });
    const { videoId } = req.params;
    let { subtitleFiles } = req.body;
    let video = await Video.findById(videoId);

    if (!video) {
      throw new ResponseError(404, 'video not found');
    }

    const bucketManager = createBucketManager();
    const moveOpts = { force: true };

    subtitleFiles = await Promise.all(map(
      subtitleFiles,
      async ({ key: tmpKey, ...extra }) => {
        let key = tmpKey;

        if (startsWith(tmpKey, 'tmp')) {
          const sha1 = await fetchFileSha1(tmpKey);
          const extname = path.extname(tmpKey);
          key = `${sha1}${extname}`;

          await bucketManager.moveAsync(bucket, tmpKey, bucket, key, moveOpts);
        }

        return { key, ...extra };
      }
    ));

    const doc = { $set: { subtitleFiles } };
    const opts = { new: true };

    video = await injectVideo(
      await Video.findByIdAndUpdate(videoId, doc, opts),
      { handler: 'toObject' }
    );

    handleResult(res, { video }, log);
  }

  catch (err) {
    handleError(res, err);
  }
};
