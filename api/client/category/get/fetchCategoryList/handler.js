const invokeMap = require('lodash/invokeMap');

const genPaginaiton = require('utils/schema/model/genPaginaiton');
const injectCategory = require('utils/models/inject/category');
const handleError = require('utils/response/handle-error');
const genCond = require('utils/schema/model/genCond');
const genSort = require('utils/schema/model/genSort');

const Category = require('models/Category');
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
    const total = await Category.count(cond);
    const categories = await injectCategory(
      await Category.find(cond).skip(skip).limit(limit).sort(sort)
    );

    res.send({ total, categories });
  }

  catch (err) {
    handleError(res, err);
  }
};
