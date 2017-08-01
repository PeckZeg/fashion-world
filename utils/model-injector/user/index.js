const injectCollections = require('./inject-collections');
const injectFavourites = require('./inject-favourites');

module.exports = (token, users, handlerName = 'toJSON') => {
  const isOutputArray = Array.isArray(users);

  return Promise.resolve(Array.isArray(users) ? users : [users])

    // inject `favourites` props
    .then(users => injectFavourites(users))

    // inject `collections` props
    .then(users => injectCollections(users))

    // output
    .then(users => isOutputArray ? users : users[0]);
};
