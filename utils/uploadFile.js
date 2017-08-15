const mime = require('mime-types');
const path = require('path');

const syncUtils = reqlib('./scripts/utils');

const { resource: CONNECT_PARAMS } = config.ftpServer;

module.exports = (req, res, upload, uploadFolder) => new Promise((resolve, reject) => {
  upload(req, res, err => {
    !err ? resolve(req.file) : reject(new ResponseError(500, err.message));
  });
})

  // gen file sha1
  .then(file => (
    syncUtils.file.genSha1(file.path).then(sha1 => ({ file, sha1 }))
  ))

  // rename file
  .then(({ file, sha1 }) => {
    const { mimetype } = file;
    const ext = mime.extension(mimetype) ? `.${mime.extension(mimetype)}` : '';
    const filename = `${sha1}${ext}`;
    const destpath = path.join(path.dirname(file.path), filename);

    return syncUtils.file.rename(file.path, destpath);
  })

  // create ftp client
  .then(filepath => (
    syncUtils.ftp.create().then(ftpClient => ({ filepath, ftpClient }))
  ))

  // connect ftp client
  .then(({ filepath, ftpClient }) => (
    syncUtils.ftp.connect(ftpClient, CONNECT_PARAMS)
      .then(ftpClient => ({ filepath, ftpClient }))
  ))

  // mkdir folder
  .then(({ ftpClient, filepath }) => (
    syncUtils.ftp.mkdir(ftpClient, uploadFolder, true)
      .then(uploadFolder => ({ ftpClient, filepath, uploadFolder }))
  ))

  // upload file to ftp
  .then(({ filepath, ftpClient, uploadFolder }) => (
    syncUtils.ftp.put(ftpClient, filepath, uploadFolder)
      .then(pathname => ({ ftpClient, filepath, pathname }))
  ))

  // close ftp client
  .then(({ ftpClient, filepath, pathname }) => (
    syncUtils.ftp.end(ftpClient).then(() => ({ filepath, pathname }))
  ))

  // remove file
  .then(({ filepath, pathname }) => (
    syncUtils.file.remove(filepath).then(() => pathname)
  ));
