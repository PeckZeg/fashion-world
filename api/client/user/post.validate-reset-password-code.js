const validateParams = reqlib('./validate-models/client/user/validate-reset-code-params');
const handleError = reqlib('./utils/response/handle-error');
const createClient = reqlib('./redis/create-client');
const keys = reqlib('./redis/keys');

module.exports = (req, res, next) => {
  Promise.resolve(req.body)

    // validate body params
    .then(validateParams)

    // create redis client
    .then(body => ({ ...body, client: createClient() }))

    // match code
    .then(args => {
      const { mobile, code, client } = args;
      const key = keys('sms:mobile:sent')(mobile);

      return client.getAsync(key).then(cacheCode => {
        if (!cacheCode) {
          return Promise.reject(
            new ResponseError(404, `code is not sent to mobile`)
          );
        }

        if (cacheCode !== code) {
          return Promise.reject(new ResponseError(403, 'invalid code'));
        }

        return args;
      });
    })

    // close redis client
    .then(({ mobile, code, client }) => (
      client.quitAsync().then(() => ({ mobile, code })
    )))

    // send result
    .then(({ mobile, code }) => {
      let result = { message: 'ok' };

      if (process.env.NODE_ENV == 'development') {
        result = { ...result, mobile, code };
      }

      res.send(result);
    })

    .catch(err => handleError(res, err));
};
