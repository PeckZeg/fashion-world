const VideoChannelCategory = reqlib('./models/VideoChannelCategory');
const VideoChannel = reqlib('./models/VideoChannel');
const catchMongooseError = reqlib('./utils/catchMongooseError');
const validateObjectId = reqlib('./utils/validate-objectid');
const CaaError = reqlib('./utils/CaaError');

module.exports = (req, res, next) => {
  Promise.resolve(req.params.categoryId)

    // Validate `categoryId`
    .then(validateObjectId)

    // Query Category Doc
    .then(categoryId => VideoChannelCategory.findById(categoryId))

    // Wrap Category Doc
    .then(category => new Promise((resolve, reject) => {
      if (!category) return reject(CaaError(404, 'category not found'));
      resolve(category);
    }))

    .then(category => res.send({ category }))
    .catch(err => res.status(err.status || 500).send({ message: err.message }));
};
