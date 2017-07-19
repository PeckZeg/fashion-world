const debug = require('debug')('sync');
const path = require('path');
const fs = require('fs');

const createClient = reqlib('./redis/create-client');
const syncUtils = require('../utils');
const handleSingleVideo = require('../handle-single-video');

const SourceVideo  = reqlib('./models/SourceVideo');

const { CACHE_KEY } = require('./config');
const { fashionWorld: CONNECT_OPTS } = config.ftpServer;
const FILE_PATH = '/tmp/WLC000001_Terra_magica_GMM_1080P.mp4';
const SOURCE_INFO_PATH = '/tmp/d67c440c527e81a0089545dcfe3b8902d4cfc83a.json';

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

    // return client.hgetAsync(CACHE_KEY, videoId).then(videoInfo => {
    //   if (!videoInfo) return { video: null, client };
    //
    //   const { sha1 } = ftpVideo;
    //
    //   return SourceVideo.findOne({ sha1 }).then(video => {
    //     if (video) return { video, client };
    //
    //     return Promise.resolve(require(SOURCE_INFO_PATH))
    //       .then(sourceInfo => {});
    //   });
    // });

    const { sha1 } = ftpVideo;

    return SourceVideo.findOne({ sha1 })

      .then(video => {
        if (video) return { video, client };

        return Promise.resolve(FILE_PATH)

          // generate definitions & screenshots
          .then(filepath => handleSingleVideo(filepath))

          // upload screenshots
          .then(video => new Promise((resolve, reject) => {
            fs.writeFile(
              '/tmp/d67c440c527e81a0089545dcfe3b8902d4cfc83a.json',
              JSON.stringify(video, null, 2),
              err => {
                if (err) return reject(err);
                resolve({ video, client });
              }
            );
          }))
      })
  })

  .then(({ video, client }) => (
    client.quitAsync().then(() => video)
  ))
