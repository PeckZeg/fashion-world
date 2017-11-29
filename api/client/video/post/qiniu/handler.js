const path = require('path');

const isEmpty = require('lodash/isEmpty');

const createBucketManager = require('utils/qiniu/createBucketManager');
const fetchVideoInfo = require('utils/qiniu/fetchVideoInfo');
const fetchFileSha1 = require('utils/qiniu/fetchFileSha1');
const handleError = require('utils/response/handleError');

const SourceVideo = require('models/SourceVideo');
const Video = require('models/Video');

const { successKey, errorKey } = require('scripts/migrateVideo/keys/qiniu');
const { videos: bucket } = config.qiniu.bucket;

module.exports = async (req, res, next) => {
  if (!isEmpty(req.body)) {

  }

  console.log(JSON.stringify(req.body));

  res.send({ message: 'ok' });
};
