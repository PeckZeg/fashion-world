const baseConfig = require('./base');
const envConfig = require(`./${process.env.NODE_ENV || 'development'}`);

module.exports = {
  ...baseConfig,
  ...envConfig
};
