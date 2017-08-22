const mapLimit = require('async/mapLimit');

const debug = require('debug')('sync');
const path = require('path');

const syncUtils = require('../../utils');
const destroyOldDefinitions = require('./destroyOldDefinitions');
const uploadDefinitionVideo = require('../uploadDefinitionVideo');

const SourceVideo = reqlib('./models/SourceVideo');
const DefinitionVideo = reqlib('./models/DefinitionVideo');

const { TMP_FOLDER, DEFINITIONS } = require('../config');
const OPTS = { new: true };

module.exports = (
  ftpVideo,
  connectOpts
) => SourceVideo.findOne({ sha1: ftpVideo.sha1 })

  .then(source => {
    if (!source) return null;

    const { sha1, size, uploadAt } = ftpVideo;

    return syncUtils.ftp.create()

      // connect ftp
      .then(ftpClient => syncUtils.ftp.connect(ftpClient, connectOpts))

      // download video file
      .then(ftpClient => {
        const { name: filename, pathname: filepath } = ftpVideo;
        const destpath = path.join(TMP_FOLDER, filename);

        debug(`正在下载视频文件 ${filename}`);

        return syncUtils.ftp.get(ftpClient, filepath, destpath)
          .then(localpath => ({ ftpClient, localpath }))
      })

      // close ftp
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

      // generate video size
      .then(({ filepath, sha1 }) => (
        syncUtils.file.size(filepath)
          .then(size => ({ filepath, sha1, size }))
      ))

      // load video metadata
      .then(({ filepath, sha1, size }) => {
        debug(`正在读取视频元信息 - ${path.basename(filepath)}`)

        return syncUtils.video.metadata(filepath)
          .then(metadata => ({
            sourceId: source._id,
            filepath,
            metadata: { ...metadata, sha1, size, uploadAt }
          }));
      })

      // update source metadata
      .then(({ sourceId, filepath, metadata }) => (
        SourceVideo.findByIdAndUpdate(sourceId, { $set: metadata }, OPTS)
          .then(source => ({ sourceId, filepath }))
      ))

      // find will remove definitions
      .then(({ sourceId, filepath }) => (
        DefinitionVideo.find({ sourceId })
          .then(definitions => definitions.map(d => d.toObject()))
          .then(willRemoveDefinitions => ({
            willRemoveDefinitions,
            sourceId,
            filepath
          }))
      ))

      // generate definitions
      .then(args => new Promise((resolve, reject) => {
        const { filepath } = args;
        const destFolder = path.dirname(filepath);
        mapLimit(DEFINITIONS, 1, (definition, cb) => {
          syncUtils.video.toDefinition(filepath, definition, destFolder)
            .then(definition => cb(null, definition))
            .catch(cb);
        }, (err, definitions) => {
          !err ? resolve({ ...args, definitions }) : reject(err);
        });
      }))

      // delete old definitions from ftp
      .then(({ willRemoveDefinitions, sourceId, filepath, definitions }) => (
        destroyOldDefinitions(willRemoveDefinitions)
          .then(() => ({
            willRemoveDefinitions, sourceId, filepath, definitions
          }))
      ))

      // delete definition models
      .then(({ willRemoveDefinitions, sourceId, filepath, definitions }) => (
        DefinitionVideo.deleteMany({
          _id: { $in: _.map(willRemoveDefinitions, '_id') }
        })
          .then(() => ({ sourceId, filepath, definitions }))
      ))

      // upload each definitions
      .then(({ sourceId, filepath, definitions }) => (
        uploadDefinitionVideo(definitions)
          .then(definitions => ({ sourceId, filepath, definitions }))
      ))

      // save each definitions
      .then(({ sourceId, filepath, definitions }) => new Promise((resolve, reject) => {
        const videoName = path.basename(filepath);
        debug(`正在保存各个清晰度的视频 ${videoName}`);
        mapLimit(definitions, 1, (o, cb) => {
          const { filepath, filename, definition, sha1, size, metadata } = o;
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
          const OPTS = { new: true, upsert: true, setDefaultsOnInsert: true };

          debug(`正在保存清晰度为 ${definition} 的视频 - ${videoName}`);

          return DefinitionVideo.findOneAndUpdate(query, doc, OPTS)
            .then(definition => cb(null, definition))
            .catch(cb);
        }, (err, definitions) => {
          !err ? resolve({ sourceId, filepath }) : reject(err);
        });
      }))

      // remove local folder
      .then(({ sourceId, filepath }) => {
        const dirname = path.dirname(filepath);
        const filename = path.basename(filepath);
        debug(`移除临时目录 ${dirname}`);
        return syncUtils.file.remove(dirname).then(() => filename);
      })
  })
