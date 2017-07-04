const router = module.exports = require('express').Router();

router.get('/', require('./get.fetch-channel-list'));
router.get('/:channelId', require('./get.fetch-channel-profile'));
router.get('/:channelId/categories', require('./get.fetch-channel-category-list'));
