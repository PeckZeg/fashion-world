const multer = require('multer');
const storage = require('./storage');

module.exports = multer({ storage });
