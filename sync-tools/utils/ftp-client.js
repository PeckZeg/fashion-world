const FtpClient = require('ftp');
const path = require('path');
const fs = require('fs');

exports.create = () => new FtpClient();

exports.connect = (ftpClient, opts) => new Promise((resolve, reject) => {
  ftpClient.on('ready', resolve);
  ftpClient.on('error', reject);
  ftpClient.connect(opts);
});

exports.download = (ftpClient, folder, file) => new Promise((resolve, reject) => {
  const { name } = file;
  const src = path.join(folder, name);
  const dest = path.join('/tmp', name);

  ftpClient.get(src, (err, stream) => {
    if (err) return reject(err);

    stream.once('close', () => resolve(dest));
    stream.pipe(fs.createWriteStream(dest));
  });
});

exports.end = ftpClient => new Promise((resolve, reject) => {
  ftpClient.on('end', resolve);
  ftpClient.end();
});

exports.list = (ftpClient, folder) => new Promise((resolve, reject) => {
  ftpClient.list(folder, (err, files) => {
    if (err) return reject(err);
    resolve(files);
  });
});
