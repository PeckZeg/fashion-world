const config = require('../../config');

module.exports = client => new Promise((resolve, reject) => {
  client.on('ready', resolve);
  client.on('error', reject);
  client.connect(config.ftpServer.lanConnect);
})
  .then(() => new Promise((resolve, reject) => {
    client.list(config.ftpServer.folder, (err, list) => {
      if (err) return reject(err);
      resolve(list);
    });
  }));
