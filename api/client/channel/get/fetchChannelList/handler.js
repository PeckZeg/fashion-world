const invokeMap = require('lodash/invokeMap');

const genPaginaiton = require('utils/schema/model/genPaginaiton');
const handleError = require('utils/response/handle-error');
const genCond = require('utils/schema/model/genCond');
const genSort = require('utils/schema/model/genSort');

const Channel = require('models/Channel');

const props = require('./props');

module.exports = async (req, res, next) => {
  try {
    const { limit, skip } = genPaginaiton(req.query);
    const cond = {
      ...genCond(req.query, props),
      publishAt: { $lte: new Date() },
      removeAt: null
    };
    const sort = { priority: -1, publishAt: -1, createAt: -1 };
    const total = await Channel.count(cond);
    const channels = invokeMap(
      await Channel.find(cond).skip(skip).limit(limit).sort(sort),
      'toJSON'
    );

    res.send({ total, channels });
  }

  catch (err) {
    handleError(res, err);
  }
};
