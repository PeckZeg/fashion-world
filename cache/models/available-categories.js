const createClient = reqlib('./redis/create-client');

const Category = reqlib('./models/Category');

const { Types: { ObjectId } } = require('mongoose');
const CACHE_KEY = reqlib('./redis/keys')('cache:available:categories')();
const CACHE_EXPIRE = moment.duration(5, 'm').asSeconds();

module.exports = () => Promise.resolve(createClient())

  // fetch from cache
  .then(client => (
    client.smembersAsync(CACHE_KEY).then(categoryIds => ({ client, categoryIds }))
  ))

  // check cache exists
  .then(({ client, categoryIds }) => {
    if (categoryIds && categoryIds.length) {
      return {
        client,
        categoryIds: categoryIds.map(id => ObjectId(id))
      };
    }

    const cond = {
      publishAt: { $lte: new Date() },
      removeAt: { $eq: null }
    };

    return Category.find(cond, '_id')

      // map objectid
      .then(categories => _.map(categories, '_id'))

      // create redis multi command
      .then(categoryIds => ({ categoryIds, multi: client.multi() }))

      // sadd cache
      .then(args => {
        const { categoryIds, multi } = args;

        categoryIds.forEach(categoryId => {
          multi.sadd(CACHE_KEY, categoryId.toString());
        });

        multi.expire(CACHE_KEY, CACHE_EXPIRE);

        return args;
      })

      // exec multi command
      .then(({ categoryIds, multi }) => (
        multi.execAsync().then(() => ({ client, categoryIds }))
      ));
  })

  // close redis client
  .then(({ client, categoryIds }) => client.quitAsync().then(() => categoryIds));
