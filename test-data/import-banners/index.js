const globalMixins = require('../../utils/global-mixins');
const mapLimit = require('async/mapLimit');
const debug = require('debug')('import');
const Banner = reqlib('./models/Banner');
const Channel = reqlib('./models/VideoChannel');

const handleUrl = require('./handle-url');
const handleGotoVideoProfile = require('./handle-goto-video-profile');

const argv = process.argv.slice(2);
const count = Number.isNaN(Number.parseInt(argv[0])) ? _.random(8, 32) : Number.parseInt(argv[0]);
const createBanner = () => Math.random() > 0.66 ? handleUrl() : handleGotoVideoProfile();

Promise.resolve(count)
  .then(count => new Promise((resolve, reject) => {
    debug(`开始创建 Banner`);

    mapLimit(_.range(count), 5, (idx, cb) => {
      debug(`\t开始创建第 ${idx + 1} 个 Banner`);

      createBanner()
        .then(banner => banner.save())

        .then(banner => {
          debug(`\t完成创建第 ${idx + 1} 个 Banner`);
          cb(null, banner);
        })
        .catch(cb);
    }, (err, banners) => {
      if (err) return reject(err);
      resolve(banners);
    });
  }))

  .then(banners => {
    debug(`_(:зゝ∠)_ 一共创建了 ${banners.length} 个 Banner`);
    process.exit(0);
  })

  .catch(err => {
    console.error(err);
    process.exit(1);
  })
