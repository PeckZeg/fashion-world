const baseConfig = require('./base');
const envConfig = require(`./${process.env.NODE_ENV}`);


let config = Object.assign({}, baseConfig, envConfig);

module.exports = config;
