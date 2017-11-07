const baseConfig = require('./base');
const envConfig = require(`./${process.env.NODE_ENV || 'development'}`);

const MERGE_PROPS = ['qiniu'];

module.exports = {
  ...baseConfig,
  ...envConfig,
  ...MERGE_PROPS.reduce((config, prop) => Object.assign(config, {
    [prop]: {
      ...baseConfig[prop],
      ...envConfig[prop]
    }
  }), {})
};
