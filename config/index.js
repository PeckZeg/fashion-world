const baseConfig = require('./base');
const envConfig = require(`./${process.env.NODE_ENV || 'development'}`);

console.log({NODE_ENV:process.env.NODE_ENV});

let config = Object.assign({}, baseConfig, envConfig);

module.exports = config;
