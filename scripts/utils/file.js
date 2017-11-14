const crypto = require('crypto');
const mkdirp = require('mkdirp');
const path = require('path');
const fs = require('fs');

const { exec } = require('child_process');

exports.genSha1 = filepath => new Promise((resolve, reject) => {
  const hash = crypto.createHash('sha1');
  const stream = fs.createReadStream(filepath);

  stream.on('readable', () => {
    const data = stream.read();
    if (data) hash.update(data);
  });

  stream.on('end', () => resolve(hash.digest('hex')));
  stream.on('error', reject);
});

exports.size = filepath => new Promise((resolve, reject) => {
  fs.stat(filepath, (err, stats) => {
    !err ? resolve(stats.size) : reject(err);
  });
});

exports.rename = exports.move = (src, dest) => new Promise((resolve, reject) => {
  mkdirp(path.dirname(dest), err => {
    if (err) return reject(err);
    resolve({ src, dest });
  });
}).then(({ src, dest }) => new Promise((resolve, reject) => {
  fs.rename(src, dest, err => {
    if (err) return reject(err);
    resolve(dest);
  });
}));

// exports.rename = (src, dest) => new Promise((resolve, reject) => {
//   exec(`mv ${src} ${dest}`, err => {
//     if (err) return reject(err);
//     resolve(dest);
//   });
// });

// exports.move = (src, dest) => new Promise((resolve, reject) => {
//   mkdirp(path.dirname(dest), err => {
//     if (err) return reject(err);
//     resolve({ src, dest });
//   });
// }).then(({ src, dest }) => new Promise((resolve, reject) => {
//   exec(`mv $(printf "%q" "${src}") $(printf "%q" "${dest}")`, err => {
//     if (err) return reject(err);
//     resolve(dest);
//   });
// }));

exports.copy = (src, dest) => new Promise((resolve, reject) => {
  mkdirp(path.dirname(dest), err => {
    if (err) return reject(err);
    resolve({ src, dest });
  });
}).then(({ src, dest }) => new Promise((resolve, reject) => {
  const readStream = fs.createReadStream(src);
  const writeStream = fs.createWriteStream(dest);

  readStream.pipe(writeStream);

  writeStream.on('error', reject);
  writeStream.on('close', () => resolve(dest));

  // exec(`cp ${src} ${dest}`, err => {
  //   if (err) return reject(err);
  //   resolve(dest);
  // });
}));

exports.remove = filepath => new Promise((resolve, reject) => {
  exec(`rm -rf $(printf "%q" "${filepath}")`, (err, a, b, c) => {
    if (err) return reject(err);
    resolve();
  });
});

exports.unlink = pathname => new Promise((resolve, reject) => {
  fs.unlink(pathname, err => {
    err ? reject(err) : resolve();
  });
});
