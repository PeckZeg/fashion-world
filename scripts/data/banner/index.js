const mapLimit = require('async/mapLimit');
const debug = require('debug')('data');

const globalMixins = require('../../../utils/global-mixins');

const fetchImageList = require('./fetchImageList');
const createUrlBanner = require('./createUrlBanner');
const createGotoVideoProfile = require('./createGotoVideoProfile');

const argv = process.argv.slice(2);
const count = Number.isNaN(Number.parseInt(argv[0])) ? _.random(8, 32) : Number.parseInt(argv[0]);
const createFactories = [
  createUrlBanner,
  createGotoVideoProfile
];


// fetch ftp image list
fetchImageList()

  // create banner
  .then(imageList => new Promise((resolve, reject) => {
    debug(`开始创建 Banner，共计 ${count} 个`);
    mapLimit(_.range(count), 1, (idx, cb) => {
      const handler = _.sample(createFactories);

      debug(`开始创建 Banner #${idx + 1}`);

      handler(imageList)
        .then(banner => banner.save())
        .then(banner => cb(null, banner))
        .catch(cb);
    }, (err, banners) => {
      if (err) return reject(err);
      resolve(banners);
    });
  }))

  .then(banners => {
    debug(`所有 Banner 创建完毕，共计 ${banners.length} 个`);
    console.log(JSON.stringify(_.sample(banners), null, 2));
    process.exit(0);
  })

  .catch(err => {
    console.error(err);
    process.exit(1);
  });
