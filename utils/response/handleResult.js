module.exports = (res, result, log, startAt) => {
  res.send(result);

  if (log) {
    log.set('response', result);

    if (startAt) {
      const duration = +new Date() - startAt;
      log.set('duration', duration);
    }

    try {
      log.save();
    }
    catch (ex) {
      // ...
    }
  }
};
