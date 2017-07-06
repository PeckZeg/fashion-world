const router = module.exports = require('express').Router();

router.get('/', require('./get.fetch-channel-list'));

router.put('/:channelId', require('./put.update-channel'));
