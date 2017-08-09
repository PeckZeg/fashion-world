const injectCollections = require('./inject-collections');
const injectFavourites = require('./inject-favourites');
const injectChannels = require('./inject-channels');
const injectCategories = require('./inject-categories');
const injectSources = require('./inject-sources');
const injectCollectedProps = require('./inject-collected-props');
const injectFavouritedProps = require('./inject-favourited-props');

module.exports = (token, videos, handlerName = 'toJSON') => {
  const isOutputArray = Array.isArray(videos);
  const isAdminAPI = handlerName == 'toObject';

  return Promise.resolve(videos)

    // init videos
    .then(videos => Array.isArray(videos) ? videos : [videos])

    // transform video docs
    .then(videos => videos.map(video => (
      _.isFunction(video[handlerName]) ? video[handlerName]() : video
    )))

    // inject collections
    .then(injectCollections)

    // inject favourites
    .then(injectFavourites)

    // inject `isCollected` props
    .then(videos => (
      isAdminAPI ? videos : injectCollectedProps(token, videos, handlerName)
    ))

    // inject `isFavoured` props
    .then(videos => (
      isAdminAPI ? videos : injectFavouritedProps(token, videos, handlerName)
    ))

    // inject channels
    .then(videos => injectChannels(videos, handlerName))

    // inject categories
    .then(videos => injectCategories(videos, handlerName))

    // inject sources
    .then(videos => injectSources(videos, handlerName))

    // output
    .then(videos => isOutputArray ? videos : videos[0]);
};
