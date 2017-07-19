const path = require('path');
const url = require('url');

const globalMixins = require('../utils/global-mixins');
const syncUtils = require('./utils');

const { folders } = config.ftpServer.resource;

const TEST_FILE_PATH = path.join(
  '/tmp',
  '0106605e8e8cb1548b02f9991382b051b9951683',
  '9b8ce41e070afdf82bb8cbe2faff45f8746b47fb.jpg'
);

syncUtils.ftp.create()

  .then(ftpClient => syncUtils.ftp.connect(ftpClient, config.ftpServer.resource))

  .then(ftpClient => (
    syncUtils.ftp.put(ftpClient, TEST_FILE_PATH, folders.images)
      .then(pathname => ({ ftpClient, pathname }))
  ))

  .then(({ ftpClient, pathname }) => (
    syncUtils.ftp.end(ftpClient).then(() => pathname)
  ))

  .then(imagepath => {
    const { protocol, host, basePathname } = config.ftpToHttp.resource;
    const pathname = path.join('/', basePathname, imagepath);

    // return url.format({ protocol, host, pathname });
    return pathname;
  })

  .then(result => {
    console.log(result);
    process.exit(0);
  })

  .catch(err => {
    console.error(err);
    process.exit(1);
  })
