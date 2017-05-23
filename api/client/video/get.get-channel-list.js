const mapLimit = require('async/mapLimit');

const VideoChannel = reqlib('./models/VideoChannel');
const VideoChannelCategory = reqlib('./models/VideoChannelCategory');
const validateParams = reqlib('./validate-models/client/video/channel/list-query-params');
const catchMongooseError = reqlib('./utils/catchMongooseError');
const CaaError = reqlib('./utils/CaaError');

module.exports = (req, res, next) => {
  Promise.resolve(req.query)
    .then(validateParams)
    .then(query => Object.assign({ isActive: true }, query))

    // 查询频道列表
    .then(query => new Promise((resolve, reject) => {
      VideoChannel.find(query).sort({ priority: -1 }).then(channels => {
        if (!channels) return reject(CaaError(404, 'channels not found'));
        resolve(channels);
      }).catch(err => reject(catchMongooseError(err)));
    }))

    // 查询频道分类
    .then(channels => new Promise((resolve, reject) => {
      mapLimit(channels, 5, (channel, cb) => {
        VideoChannelCategory
          .find({ channelId: channel._id, isActive: true })
          .sort({ priority: -1 })
          .then(categories => {
            cb(null, Object.assign(channel.toJSON(), { categories }));
          })
          .catch(err => cb(err));
      }, (err, channels) => {
        if (err) return reject(CaaError(500, err.message));
        resolve(channels);
      });
    }))

    .then(channels => res.send({ channels }))
    .catch(err => res.status(err.status || 500).send({ message: err.message }));
};
