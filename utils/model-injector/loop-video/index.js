const injectVideoProp = require('./injectVideos');

module.exports = (token, loopVideos, handlerName = 'toJSON') => {
  const isOutputArray = Array.isArray(loopVideos);

  return Promise.resolve(loopVideos)

    // init docs
    .then(loopVideos => Array.isArray(loopVideos) ? loopVideos : [loopVideos])

    // transform docs
    .then(loopVideos => loopVideos.map(loopVideo => (
      _.isFunction(loopVideo[handlerName]) ? loopVideo[handlerName]() : loopVideo
    )))

    // inject `video` prop
    .then(loopVideos => injectVideoProp(token, loopVideos, handlerName))

    // output
    .then(loopVideos => isOutputArray ? loopVideos : loopVideos[0]);
};
