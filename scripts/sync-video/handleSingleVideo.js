const mapLimit = require('async/mapLimit');
const debug = require('debug')('sync');
const path = require('path');

const syncUtils = require('../utils');
const deriveSingleVideo = require('./deriveSingleVideo');

const SourceVideo = reqlib('./models/SourceVideo');
const DefinitionVideo = reqlib('./models/DefinitionVideo');

const { TMP_FOLDER } = require('./config');
const { fashionWorld: CONNECT_OPTS } = config.ftpServer;
const OPTS = { new: true, upsert: true, setDefaultsOnInsert: true };

module.exports = (
  ftpVideo,
  connectOpts = CONNECT_OPTS
) => SourceVideo.findOne({ sha1: ftpVideo.sha1 })

  .then(sourceVideo => {
    if (sourceVideo) return sourceVideo;

    return syncUtils.ftp.create()

      // connect ftp
      .then(ftpClient => syncUtils.ftp.connect(ftpClient, connectOpts))

      // download file
      .then(ftpClient => {
        const { name: filename, pathname: filepath } = ftpVideo;
        const destpath = path.join(TMP_FOLDER, filename);

        debug(`正在下载视频文件 ${filename}`);

        return syncUtils.ftp.get(ftpClient, filepath, destpath)
          .then(localpath => ({ ftpClient, localpath }));
      })

      // close ftp server
      .then(({ ftpClient, localpath }) => (
        syncUtils.ftp.end(ftpClient).then(() => localpath)
      ))

      // generate video file sha1
      .then(localpath => (
        syncUtils.file.genSha1(localpath)
          .then(sha1 => ({ localpath, sha1 }))
      ))

      // move & rename file
      .then(({ localpath, sha1 }) => (
        syncUtils.file.move(
          localpath,
          path.join(TMP_FOLDER, sha1, path.basename(localpath))
        )
          .then(filepath => ({ filepath, sha1 }))
      ))

      // load video metadata
      .then(({ filepath, sha1 }) => (
        syncUtils.video.metadata(filepath)
          .then(metadata => ({ filepath, sha1, metadata }))
      ))

      // derive definitions & screenshots
      .then(({ filepath, sha1, metadata }) => (
        deriveSingleVideo(filepath)
          .then(({ definitions, screenshots }) => ({
            filepath,
            sha1,
            metadata,
            definitions,
            screenshots
          }))
      ))

      // save source video
      .then(videoInfo => {
        const ftp = 'res';
        const { pathname: filepath, name: filename } = ftpVideo;
        const { sha1, metadata, screenshots } = videoInfo;
        const query = { sha1 };
        const uploadAt = moment(videoInfo.uploadAt).toDate();
        const doc = {
          $set: {
            ftp,
            filename,
            filepath,
            sha1,
            screenshots,
            uploadAt,
            ...metadata
          }
        };

        debug(`保存源视频 ${filename}`);

        return SourceVideo.findOneAndUpdate(query, doc, OPTS)
          .then(sourceVideo => ({ videoInfo, sourceVideo }));
      })

      // save definitions
      .then(({ videoInfo, sourceVideo }) => new Promise((resolve, reject) => {
        const { name: videoName } = ftpVideo;

        debug(`保存各个清晰度的视频 ${videoName}`);
        mapLimit(videoInfo.definitions, 1, (definitionInfo, cb) => {
          const { _id: sourceId } = sourceVideo;
          const { sha1, filepath, filename, definition, metadata } = definitionInfo;
          const query = { sha1 };
          const doc = {
            $set: {
              sha1,
              sourceId,
              filepath,
              filename,
              definition,
              ...metadata
            }
          };

          debug(`保存清晰度为 ${definition} 的视频 ${videoName}`);

          return DefinitionVideo.findOneAndUpdate(query, doc, OPTS)
            .then(definition => cb(null, definition))
            .catch(cb);
        }, (err, definitions) => {
          if (err) return reject(err);
          const { filepath } = videoInfo;
          resolve({ filepath, sourceVideo });
        });
      }))

      // remove local folder
      .then(({ filepath, sourceVideo }) => {
        const dirname = path.dirname(filepath);
        debug(`移除临时目录 ${dirname}`);
        return syncUtils.file.remove(dirname).then(() => sourceVideo);
      });
  });
