let router = module.exports = require('express').Router();

router.get('/channel', require('./get.get-channel-list'));
router.get('/channel/:channelId', require('./get.get-channel-profile'));
router.get('/channel/:channelId/categories', require('./get.get-channel-category-list'));

router.get('/channel/category/:categoryId', require('./get.get-channel-category-profile'));
