const path = require('path');
const Client = require('ftp');
const fs = require('fs');
const client = new Client();

const VIDEO_FOLDER = 'FTV';

let promise = new Promise((resolve, reject) => {
  client.on('ready', resolve);
  client.on('error', reject);
  client.connect({
    host: '172.16.0.11',
    user: 'ftpuser',
    password: 'abc.123'
  });
});

promise
  .then(() => new Promise((resolve, reject) => {
    client.list(VIDEO_FOLDER, (err, list) => {
      if (err) return reject(err);
      resolve(list);
    });
  }))
  .then(list => new Promise((resolve, reject) => {
    const filename = list[1].name;
    const src = path.join(VIDEO_FOLDER, filename);
    const dest = path.join('/tmp', filename);

    console.log(filename);

    client.get(src, (err, stream) => {
      if (err) return reject(err);

      stream.once('close', () => client.end());
      stream.pipe(fs.createWriteStream(dest));
    });
  }))
  .catch(err => console.error(err));
