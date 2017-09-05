const transformQuery = reqlib('./utils/transform-query');
const { TRANS_PROPS } = require('./config');

module.exports = query => transformQuery(query, TRANS_PROPS);
