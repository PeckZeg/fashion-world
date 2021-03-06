const Mock = require('mockjs');

const Video = reqlib('./models/Video');
const Channel = reqlib('./models/Channel');
const Category = reqlib('./models/Category');

const { ObjectId } = require('mongoose').Types;
const { Random } = Mock;
const CHANNEL_ID = ObjectId('5959b33cb912aab9e9e9eb15');

const getRandomDate = () => {
  const start = +moment().add(-7, 'days');
  const end = +moment();

  return moment(_.random(start, end)).toDate();
};

module.exports = source => Promise.resolve({
  source,
  sourceId: source._id,
  channelId: CHANNEL_ID
})

  // sample category
  .then(args => (
    Category.aggregate().match({ channelId: args.channelId }).sample(1)
      .then(categories => ({
        ...args,
        categoryId: categories[0]._id
      }))
  ))

  // gen model params
  .then(({ source, sourceId, channelId, categoryId }) => {
    const query = { sourceId };
    const doc = {
      $setOnInsert: {
        sourceId,
        channelId,
        categoryId,
        cover: _.sample(source.screenshots),
        title: Random.ctitle(4, 32),
        subtitle: Random.ctitle(4, 128),
        abstract: Random.cparagraph(2, 16).split('。').join('。\n'),
        summary: Random.cparagraph(4, 32).split('。').join('。\n'),
        publishAt: getRandomDate(),
        ...Mock.mock({ 'tags|1-4': ['@cword(2, 8)'] })
      }
    };
    const opts = { new: true, upsert: true, setDefaultsOnInsert: true };

    return { query, doc, opts };
  })

  // update model
  .then(({ query, doc, opts }) => Video.findOneAndUpdate(query, doc, opts));
