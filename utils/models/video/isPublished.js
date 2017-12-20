/**
 *  确定视频是否已发布
 *  @param video
 *  @returns {Boolean}
 */
module.exports = video => (
  video &&
  video.publishAt &&
  moment().isAfter(video.publishAt) &&
  !video.removeAt
);
