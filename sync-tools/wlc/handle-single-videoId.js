const debug = require('debug')('sync');
const path = require('path');

const createClient = reqlib('./redis/create-client');
const syncUtils = require('../utils');
const handleSingleVideo = require('../handle-single-video');

const SourceVideo  = reqlib('./models/SourceVideo');

const { fashionWorld: CONNECT_OPTS } = config.ftpServer;

module.exports = (videoId, ftpVideos) => Promise.resolve({ videoId, ftpVideos })

  // create redis client
  .then(args => ({ ...args, client: createClient() }))

  // query ftp video file
  .then(({ videoId, ftpVideos, client }) => {
    const ftpVideo = ftpVideos.filter(video => (
      video.name.toLowerCase().indexOf(videoId.toLowerCase()) > -1
    ))[0];

    return { videoId, ftpVideo, client };
  })

  .then(({ videoId, ftpVideo, client }) => {
    if (!ftpVideo) return { video: null, client };

    const { sha1 } = ftpVideo;

    return SourceVideo.findOne({ sha1 })

      .then(video => {
        if (video) return { video, client };

        return syncUtils.ftp.create()

          // connect ftp
          .then(ftpClient => syncUtils.ftp.connect(ftpClient, CONNECT_OPTS))

          // download file
          .then(ftpClient => {
            const { name: filename, pathname: filepath } = ftpVideo;
            const destpath = path.join('/tmp', filename);

            debug(`正在下载视频文件 - ${filename}`);

            return syncUtils.ftp.get(ftpClient, filepath, destpath)
              .then(filepath => ({ ftpClient, filepath }));
          })

          // close ftp server
          .then(({ ftpClient, filepath }) => (
            syncUtils.ftp.end(ftpClient).then(() => filepath)
          ))

          // generate definitions & screenshots
          .then(filepath => handleSingleVideo(filepath))

          // upload screenshots
          .then(video => ({ video, client }))
      })
  })

  .then(({ video, client }) => (
    client.quitAsync().then(() => video)
  ))
