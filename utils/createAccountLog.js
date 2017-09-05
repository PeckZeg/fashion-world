const path = require('path');

const AccountLog = reqlib('./models/AccountLog');

module.exports = (req, ACTION) => new AccountLog({
  action: ACTION,
  method: req.method,
  params: req.params,
  query: req.query,
  body: req.body,
  path: path.join(req.baseUrl, req.path),
  route: path.join(req.baseUrl, req.route.path)
});
