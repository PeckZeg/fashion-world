const mime = require('mime-types');
const uuid = require('uuid/v4');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, '/tmp'),
  filename: (req, file, cb) => {
    const { mimetype } = file;
    const ext = mime.extension(mimetype);

    cb(null, `${uuid()}.${ext}`);
  }
});

module.exports = storage;
