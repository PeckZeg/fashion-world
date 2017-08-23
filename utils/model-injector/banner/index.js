const injectCategories = require('./injectCategories');
const injectChannels = require('./injectChannels');

module.exports = (banners, handler = 'toJSON') => {
  const isOutputArray = Array.isArray(banners);

  return Promise.resolve(banners)

    // init
    .then(banners => Array.isArray(banners) ? banners : [banners])

    // transform banner docs
    .then(banners => banners.map(banner => (
      _.isFunction(banner[handler]) ? banner[handler]() : banner
    )))

    // inject channels
    .then(injectChannels)

    // inject categories
    .then(injectCategories)

    // check is fetch one from args
    .then(banners => isOutputArray ? banners : banners[0]);
};
