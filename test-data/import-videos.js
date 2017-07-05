const mapLimit = require('async/mapLimit');
const debug = require('debug')('import');
const Mock = require('mockjs');

const globalMixins = require('../utils/global-mixins');

const SourceVideo = reqlib('./models/SourceVideo');
const Video = reqlib('./models/Video');
const Entity = reqlib('./models/Entity');
const Channel = reqlib('./models/Channel');
const Category = reqlib('./models/Category');

const { Random } = Mock;
const OPTS = { new: true, upsert: true, setDefaultsOnInsert: true };

SourceVideo.count()

  // sample source video docs
  .then(count => {
    const sample = ~~(count * 2 / 3);

    debug(`开始挑选 ${sample} 个视频源`);
    return SourceVideo.aggregate().sample(sample)
      .then(sources => sources.map(source => new SourceVideo(source)));
  })

  // create videos
  .then(sources => new Promise((resolve, reject) => {
    debug(`即将开始生成 ${sources.length} 个视频`);
    mapLimit(sources, 1, (source, cb) => {
      const idx = sources.indexOf(source);
      const sourceId = source._id;
      const cond = { sourceId };
      const cover = _.sample(source.screenshots);
      const update = { $set: { sourceId, cover } };

      debug(`\t正在生成第 ${idx + 1} 个视频: ${sourceId}`)

      Video.findOneAndUpdate(cond, update, OPTS)
        .then(video => cb(null, video))
        .catch(cb);
    }, (err, videos) => {
      if (err) return reject(err);
      debug(`所有视频生成完毕，共计 ${videos.length} 个！`);
      resolve(videos);
    });
  }))

  // fetch channel id list
  .then(videos => (
    Category.find(null, '_id channelId')
      .then(categories => categories.map(({ channelId, _id: categoryId }) => ({ channelId, categoryId })))
      .then(channelCategories => ({ videos, channelCategories }))
  ))

  // generate entities
  .then(({ videos, channelCategories }) => new Promise((resolve, reject) => {
    debug(`准备生成 ${videos.length} 个实体`);
    mapLimit(videos, 1, (video, cb) => {
      const { _id } = video;
      const idx = videos.indexOf(video);
      const { channelId, categoryId } = _.sample(channelCategories);
      const title = Random.ctitle(4, 32);
      const type = 'video';
      const abstract = Random.cparagraph(1, 5).split('。').join('。\n');
      const now = +moment();
      const publishLeftBound = +moment().startOf('year');
      const publishBeginAt = moment(_.random(publishLeftBound, now)).toDate();
      const publishEndAt = Math.random() > 0.6 ? moment(publishBeginAt).add(_.random(128, 65536), 'hours').toDate() : null;
      const recommendBeginAt = Math.random() > 0.5 ? publishBeginAt : null;
      const recommendEndAt = recommendBeginAt && Math.random() > 0.5 ? moment(publishBeginAt).add(_.random(128, 65536), 'hours').toDate() : null;
      const doc = {
        $set: {
          _id, type, title, abstract,
          publishBeginAt, publishEndAt,
          recommendBeginAt, recommendEndAt,
          ...Mock.mock({
            'tags|2-6': ['@cword(2, 6)'],
            'keywords|2-6': ['@cword(2, 6)']
          })
        }
      };

      debug(`\t正在生成第 ${idx + 1} 个实体: ${_id}`);

      Entity.findByIdAndUpdate(_id, doc, OPTS)
        .then(entity => cb(null, entity))
        .catch(cb);
    }, (err, entities) => {
      if (err) return reject(err);
      debug(`生成实体成功！共生成了 ${entities.length} 个实体`);
      resolve(entities);
    });
  }))

  // log
  .then(results => {
    process.exit(0);
  })

  .catch(err => {
    console.error(err);
    process.exit(1);
  })
