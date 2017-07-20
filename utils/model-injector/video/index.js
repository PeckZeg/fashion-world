module.exports = (token, videos, handlerName = 'toJSON') => Promise.resolve(videos)

  // transform video docs
  .then(videos => videos.map(video => (
    _.isFunction(video[handlerName]) ? video[handlerName]() : video
  )))
