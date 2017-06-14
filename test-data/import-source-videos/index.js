const FtpClient = require('ftp');
const mapLimit = require('async/mapLimit');
const debug = require('debug')('syncVideo');

const globalMixins = require('../../utils/global-mixins');
const config = require('../../config');
const ftpClient = new FtpClient();
const handleSingleFile = require('./handle-single-file');

const CACHE_KEY = 'test-data:source-videos';

Promise.resolve({ ftpClient })
  // Connect Ftp Server
  .then(({ ftpClient }) => new Promise((resolve, reject) => {
    debug(`正在连接 FTP 服务器（${config.ftpServer.lanConnect.host}）`);
    ftpClient.on('ready', () => {
      debug(`完成连接 FTP 服务器（${config.ftpServer.lanConnect.host}）`);
      resolve({ ftpClient });
    });
    ftpClient.on('error', reject);
    ftpClient.connect(config.ftpServer.lanConnect);
  }))

  //  Fetch Video List
  .then(({ ftpClient }) => new Promise((resolve, reject) => {
    debug(`正在获取目录 ${config.ftpServer.folder} 的文件列表`);
    ftpClient.list(config.ftpServer.folder, (err, files) => {
      if (err) return reject(err);
      debug(`完成获取目录 ${config.ftpServer.folder} 的文件列表`);
      resolve({ ftpClient, files });
    });
  }))

  // Pick MP4 Files
  .then(({ ftpClient, files }) => {
    files = _.chain(files).map(file => {
      return file.name.toLowerCase().endsWith('mp4') ? file : null;
    }).compact().value();

    return { ftpClient, files };
  })

  // Handle Each File
  .then(({ ftpClient, files }) => new Promise((resolve, reject) => {
    let args = process.argv.slice(2);
    let start = Number.parseInt(args[0]);
    let end = Number.parseInt(args[1]);

    start = Number.isNaN(start) ? 0 : start;
    end = Number.isNaN(end) ? files.length : end;

    // let count = Number(_.last(process.argv));
    //     count = Number.isNaN(count) ? files.length : count;

    mapLimit(files.slice(start, end), 1, (file, cb) => {
      handleSingleFile({ ftpClient, file, debug })
        .then(file => cb(null, file.toJSON({ virtuals: true })))
        .catch(cb);
    }, (err, files) => {
      if (err) return reject(err);
      resolve({ ftpClient, files });
    });
  }))

  .then(({ ftpClient, files }) => {
    debug(`完成！一共同步了 ${files.length} 个视频文件`);
    process.exit(0);
  })

  .catch(err => {
    console.error(err);
    process.exit(1);
  });
