const mapLimit = require('async/mapLimit');
const debug = require('debug')('sync');
const path = require('path');

const globalMixins = require('../../utils/global-mixins');
const loadSyncList = require('./load-sync-list');

const Video = reqlib('./models/Video');
const SourceVideo = reqlib('./models/SourceVideo');
const Channel = reqlib('./models/Channel');
const Category = reqlib('./models/Category');

const { ObjectId } = require('mongoose').Types;

const CSV_FILE_PATH = path.join(__dirname, './csv/20170717.csv');
const CHANNEL_ID = ObjectId('596ecd3ff223c686eeb624c2');
const OPTS = { new: true, upsert: true, setDefaultsOnInsert: true };

loadSyncList(CSV_FILE_PATH)

  .then(data => new Promise((resolve, reject) => {
    mapLimit(data, 1, (videoInfo, cb) => {
      const query = { filename: new RegExp(videoInfo.id, 'i') };

      debug(`正在查询源视频 ${videoInfo.id}`);

      SourceVideo.findOne(query)
        .then(sourceVideo => {
          if (!sourceVideo) return cb();

          const channelId = CHANNEL_ID;
          const { genre: name } = videoInfo;
          const query = { channelId, name };
          const doc = {
            $setOnInsert: {
              channelId,
              name,
              publishAt: new Date()
            }
          };

          debug(`正在查询频道分类 ${name}`);

          return Category.findOneAndUpdate(query, doc, OPTS)
            .then(category => {
              const channelId = CHANNEL_ID;
              const categoryId = category._id;
              const sourceId = sourceVideo._id;
              const {
                originalTitle,
                title,
                subtitle,
                season,
                episode,
                part,
                abstract,
                summary,
                castings,
                tags,
                year,
                rightsOwner,
                productionCountry,
                originalLanguage
              } = videoInfo;
              const query = { channelId, categoryId, sourceId };
              const doc = {
                $setOnInsert: {
                  channelId,
                  categoryId,
                  sourceId,
                  originalTitle,
                  title,
                  subtitle,
                  season,
                  episode,
                  part,
                  abstract,
                  summary,
                  castings,
                  tags,
                  year,
                  rightsOwner,
                  productionCountry,
                  originalLanguage,
                  publishAt: new Date()
                }
              };

              return Video.findOneAndUpdate(query, doc, OPTS);
            });
        })
        .then(video => cb(null, video))
        .catch(cb);
    }, (err, videos) => {
      if (err) return reject(err);
      resolve(videos);
    });
  }))

  .then(result => {
    result = result.filter(item => item);
    console.log(JSON.stringify(result, null, 2));
    process.exit(0);
  })

  .catch(err => {
    console.error(err);
    process.exit(1);
  });
