const map = require('lodash/map');

const genPaginaiton = require('utils/schema/model/genPaginaiton');
const injectCategory = require('utils/models/inject/category');
const handleResult = require('utils/response/handleResult');
const handleError = require('utils/response/handle-error');
const authToken = require('utils/token/auth/account');
const genCond = require('utils/schema/model/genCond');
const genSort = require('utils/schema/model/genSort');
const createLog = require('utils/createAccountLog');
const props = require('./props');

const Category = require('models/Category');
const Channel = require('models/Channel');

const action = 'ADMIN_CATEGORY_GET_FETCH_CATEGORY_LIST';

module.exports = async (req, res, next) => {
  try {
    const log = createLog(req, action);
    const token = await authToken(req, action, { log });
    const { limit, skip } = genPaginaiton(req.query);
    const cond = genCond(req.query, props);
    const sort = genSort(req.query, props);
    console.log({cond,sort});
    let total = await Category.count(cond);
    let categories = await Category.find(cond).limit(limit).skip(skip).sort(sort);

    categories = await injectCategory(categories, { handler: 'toObject' });

    handleResult(res, { total, categories }, log);
  }

  catch (err) {
    handleError(res, err);
  }
};
