const debug = require('debug')('auth');
const colors = require('colors/safe');
const crypto = require('crypto');
const path = require('path');

const isFunction = require('lodash/isFunction');

const createClient = reqlib('./redis/createClient');
const genSignature = require('../genSignature');

/**
 *  验证器
 *  @param {object} req Express Router#req 对象
 *  @param {string} actionName 动作名称
 *  @param {object} [opts] 可选项
 *  @param {boolean} [opts.required = false] 该验证是否是必需的
 *  @param {Function} [transform] 令牌转换函数
 *  @param {object} [log] 日志
 *  @param {string} [logIdProp = 'userId'] 覆盖属性
 */
module.exports = async (req, actionName, opts = {}) => {
  const { required = false, cacheKey, transform, log, logIdProp = 'userId' } = opts;
  const authorization = req.header('authorization');
  const action = config.apiActions[actionName];

  // for api debugger
  req.__params__ = req.params;
  req.__route__ = `${req.baseUrl}${req.route.path}`;

  if (!required && !authorization) {
    return null;
  }

  // validate `authorization` format
  const auth = config.patterns.authorization.exec(authorization);

  if (!auth) {
    throw new ResponseError(400, 'invalid authorization');
  }

  let token = Buffer.from(auth[1], 'base64').toString();
      token = config.patterns.accessKeys.exec(token);

  if (!token) {
    throw new ResponseError(400, 'invalid authorization');
  }

  const apiKey = token[1];
  const signature = token[2];
  const timestamp = +token[3];

  debug(colors.bold.magenta('action-name'), actionName);
  debug(colors.bold.magenta('action'), action);
  debug(colors.bold.magenta('apiKey'), apiKey);
  debug(colors.bold.magenta('signature'), signature);
  debug(
    colors.bold.magenta('timestamp'),
    timestamp,
    colors.italic.gray(`(${moment(timestamp).format()})`)
  );

  // validate `apiKey`
  const client = createClient();

  token = await client.getAsync(cacheKey(apiKey));

  if (!token) {
    throw new ResponseError(404, 'apiKey not found');
  }

  token = JSON.parse(token);

  if (isFunction(transform)) token = transform(token);

  await client.quitAsync();

  // validate signature
  const { secretKey } = token;
  const authSignature = genSignature(action, apiKey, secretKey, timestamp);

  debug(colors.bold.magenta('auth signature'), authSignature);

  if (authSignature !== signature) {
    throw new ResponseError(400, 'invalid signature');
  }

  if (log) {
    log[logIdProp] = token[logIdProp];
  }

  return token;
};
