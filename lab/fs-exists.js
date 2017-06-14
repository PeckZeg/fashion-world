const fs = require('fs');
const mapLimit = require('async/mapLimit');
const FILES = ['/tmp/a.png', '/tmp/b.png'];

mapLimit(FILES, 5, (file, cb) => {
  fs.access(file, err => cb(null, err ? null : file))
}, (err, files) => {
  if (err) throw err;
  console.log(files);
});
