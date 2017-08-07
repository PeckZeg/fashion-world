const transformQuery = reqlib('./utils/transform-query');

const TRANSFORM_OPTIONS = {
  isPublished: Boolean,
  isRecommended: Boolean,
  isRemoved: Boolean
};

module.exports = query => transformQuery(query, TRANSFORM_OPTIONS);
