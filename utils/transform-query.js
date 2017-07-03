module.exports = (query, data, strict = false) => {
  _.forEach(data, (type, key) => {
    let value = query[key];
    let opt = _.isPlainObject(type) ? type : { type };

    if (_.has(query, key)) {
      switch (opt.type) {
        case Boolean:
        case 'Boolean':
          if (_.includes(['true', 'false'], value)) {
            query[key] = value === 'true';
          }

          else {
            delete query[key];
          }
          break;

        case Array:
        case 'StringArray':
          if (typeof value === 'string') {
            query[key] = value.split(',').map(s => s.trim());
          }

          else {
            delete query[key];
          }
          break;
        default:
          //  ...
      }
    }
  });

  return query;
};
