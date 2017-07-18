const FtpClient = require('ftp');
const path = require('path');
const fs = require('fs');

exports.create = () => Promise.resolve(new FtpClient());

exports.connect = (ftpClient, opts) => new Promise((resolve, reject) => {
  ftpClient.on('ready', () => resolve(ftpClient));
  ftpClient.on('error', reject);
  ftpClient.connect(opts);
});

exports.get = (ftpClient, filepath, destpath) => new Promise((resolve, reject) => {
  ftpClient.get(filepath, (err, stream) => {
    if (err) return reject(err);

    stream.once('close', () => resolve(destpath));
    stream.pipe(fs.createWriteStream(destpath));
  });
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
  ftpClient.on('error', reject);
  ftpClient.end();
});

exports.list = (ftpClient, folder) => new Promise((resolve, reject) => {
  ftpClient.list(folder, (err, files) => {
    if (err) return reject(err);
    resolve(files);
  });
});

exports.put = (ftpClient, inputpath, destFolder) => new Promise((resolve, reject) => {
  const inputStream = fs.createReadStream(inputpath);
  const destpath = path.join(destFolder, path.basename(inputpath));

  ftpClient.put(inputStream, destpath, err => {
    if (err) return reject(err);
    resolve(destpath);
  });
});
