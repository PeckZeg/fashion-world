const injectChannels = require('./inject-channels');

module.exports = (categories, handler = 'toJSON') => {
  const isOutputArray = Array.isArray(categories);

  return Promise.resolve(categories)

    // init
    .then(categories => isOutputArray ? categories : [categories])

    // transform category docs
    .then(categories => categories.map(category => (
      _.isFunction(category[handler]) ? category[handler]() : category
    )))

    // inject channels
    .then(injectChannels)

    // check is fetch one from args
    .then(categories => isOutputArray ? categories : categories[0]);
};
