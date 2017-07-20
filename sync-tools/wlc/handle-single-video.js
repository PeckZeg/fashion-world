const debug = require('debug')('sync');
const path = require('path');

const handleSingleVideo = require('../handle-single-video');
const syncUtils = require('../utils');

const SourceVideo = reqlib('./models/SourceVideo');
const DefinitionVideo = reqlib('./models/DefinitionVideo');

const { TMP_FOLDER } = require('../config');
const { fashionWorld: CONNECT_OPTS } = config.ftpServer;
const OPTS = { new: true, upsert: true, setDefaultsOnInsert: true };

module.exports = ftpVideo => Promise.resolve(ftpVideo)

  .then(ftpVideo => (
    SourceVideo.findOne({ sha1: ftpVideo.sha1 }).then(sourceVideo => {
      if (sourceVideo) return sourceVideo;

      return syncUtils.ftp.create()

        // connect ftp
        .then(ftpClient => syncUtils.ftp.connect(ftpClient, CONNECT_OPTS))

        // download file
        .then(ftpClient => {
          const { name: filename, pathname: filepath } = ftpVideo;
          const destpath = path.join(TMP_FOLDER, filename);

          debug(`正在下载视频文件 - ${filename}`);

          return syncUtils.ftp.get(ftpClient, filepath, destpath)
            .then(localpath => ({ ftpClient, localpath }));
        })

        // close ftp server
        .then(({ ftpClient, localpath }) => (
          syncUtils.ftp.end(ftpClient).then(() => localpath)
        ))

        // generate definitions & screenshots
        .then(localpath => (
          handleSingleVideo(localpath)
            .then(videoInfo => ({ localpath, videoInfo }))
        ))

        // save source video
        .then(({ localpath, videoInfo }) => {
          const ftp = 'wlc';
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
              ...metadata,
            }
          };

          debug(`保存源视频 ${filename}`);

          return SourceVideo.findOneAndUpdate(query, doc, OPTS)
            .then(sourceVideo => ({ localpath, videoInfo, sourceVideo }));
        })

        // save definitions
        .then(({ localpath, videoInfo, sourceVideo }) => new Promise((resolve, reject) => {
          debug(`保存各个清晰度的视频`);
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

            debug(`保存清晰度为 ${definition} 的视频`);

            return DefinitionVideo.findOneAndUpdate(query, doc, OPTS)
              .then(definition => cb(null, definition))
              .catch(cb);
          }, (err, definitions) => {
            if (err) return reject(err);
            resolve({ localpath, sourceVideo });
          });
        }))

        // remove folder
        .then(({ localpath, sourceVideo }) => {
          const pathname = path.dirname(localpath);
          debug(`移除临时目录 ${pathname}`);
          return syncUtils.file.remove(pathname).then(() => sourceVideo);
        })
    })
  ))
