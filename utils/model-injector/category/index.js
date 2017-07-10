const injectChannels = require('./inject-channels');

module.exports = (categories, handlerName = 'toJSON') => Promise.resolve(categories)

  .then(categories => injectChannels(categories, handlerName));
