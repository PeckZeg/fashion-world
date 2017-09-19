module.exports = (res, result, log) => {
  res.send(result);

  if (log) {
    log.set('response', result);
    log.set('duration', +new Date() - log.createAt);

    try {
      log.save();
    }
    catch (ex) {
      // ...
    }
  }
};
