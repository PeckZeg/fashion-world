const mapObjectIds = reqlib('./utils/map-objectids');

const Channel = reqlib('./models/Channel');

module.exports = (categories, handlerName = 'toJSON') => {
  const isFetchOne = !Array.isArray(categories);

  return Promise.resolve(Array.isArray(categories) ? categories : [categories])

    // fetch `_id` list
    .then(categories => ({
      categories,
      _id: mapObjectIds(categories, 'channelId')
    }))

    // fetch channel docs
    .then(({ categories, _id }) => (
      Channel.find({ _id }).then(channels => ({
        categories,
        channels: _.keyBy(channels, '_id')
      }))
    ))

    // inject channels
    .then(({ categories, channels }) => categories.map(category => {
      const { channelId } = category;
      const model = channels[channelId];
      const channel = model ? model[handlerName]() : null;

      return { ...category, channel };
    }))

    // check is fetch one from args
    .then(categories => isFetchOne ? categories[0] : categories);
};
