const path = require('path');
const upload = reqlib('./utils/multer/upload');
const uploadFile = reqlib('./utils/upload-file');
const caaError = reqlib('./utils/CaaError');

module.exports = (req, res, next) => {
  uploadFile(upload.single('cover'), {
    req, res,
    destination: '/images/video'
  })

    .then(result => res.send({ result }))
    .catch(err => res.status(err.status || 500).send({ message: err.message }));
};
