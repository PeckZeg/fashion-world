const auth = reqlib('./utils/access-keys/account/auth');
const Account = reqlib('./models/Account');
const validateParams = reqlib('./validate-models/admin/account/list-query-params');
const handleError = reqlib('./utils/catchMongooseError');

const ACTION = config.apiActions['admin:account:get:list'];

module.exports = (req, res, next) => {
  auth(req.header('authorization'), ACTION, false)

    // Transform Query Params
    .then(() => _.reduce(req.query, (query, value, key) => {
      switch (key) {
        case 'isActive':
          if (_.includes(['true', 'false'], value)) {
            Object.assign(query, { [key]: value === 'true' });
          }
          break;

        default:
          Object.assign(query, { [key]: value });
      }

      return query;
    }, {}))

    // Validate Query Params
    .then(validateParams)

    // Query Accounts
    .then(({ offset, limit, isActive }) => {
      let query = _.reduce({ isActive }, (query, value, key) => {
        if (value !== void 0) Object.assign(query, { [key]: value });

        return query;
      }, {});

      return Account.find(query).skip(offset * limit).limit(limit).sort({ createAt: -1 });
    })

    // Fetch Account Count
    .then(accounts => new Promise((resolve, reject) => {
      Account.count()
        .then(total => resolve({ total, accounts }))
        .catch(err => reject(handleError(err)));
    }))

    .then(result => res.send(result))
    .catch(err => res.status(err.status || 500).send({ message: err.message }));
};
