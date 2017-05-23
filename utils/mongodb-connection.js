const mongoose = require('mongoose');

const { host, port, database, user, pass } = config.mongodb;

if (user && pass) {
  module.exports = mongoose.createConnection(`mongodb://${user}:${pass}@${host}:${port}/${database}`);
}

else {
  module.exports = mongoose.createConnection(host, database, 27017);
}
