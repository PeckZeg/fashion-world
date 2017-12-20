const includes = require('lodash/includes');

const fetchPublishedVideos = require('cache/publishedVideos');

/**
 *  确定视频是否已发布
 *  @param video
 *  @returns {Promise}
 */
module.exports = async video => (
  includes(
    await fetchPublishedVideos({ string: true }),
    video._id.toString()
  ) &&
  video &&
  video.publishAt &&
  moment().isAfter(video.publishAt) &&
  !video.removeAt
);
