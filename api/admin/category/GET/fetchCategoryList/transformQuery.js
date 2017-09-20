const transformQuery = reqlib('./utils/transform-query');
const { QUERY_PROPS } = require('./props');

module.exports = query => transformQuery(query, QUERY_PROPS);
