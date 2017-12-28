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

const About = require('models/About');

const action = 'ADMIN_ABOUT_GET_FETCH_ABOUT_LIST';

module.exports = async function(req, res, next) {
  try {
    const log = createLog(req, action);
    const token = await authToken(req, action, { log });
    const { limit, skip } = genPaginaiton(req.query);
    const cond = genCond(req.query, props);
    const sort = genSort(req.query, props);
    const total = await About.count(cond);
    let abouts = map(
      await About.find(cond).limit(limit).skip(skip).sort(sort),
      about => about.toObject()
    );

    handleResult(res, { total, abouts }, log);
  }

  catch (err) {
    handleError(res, err);
  }
};
