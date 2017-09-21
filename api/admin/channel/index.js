const router = module.exports = require('express').Router();

router.get('/', require('./GET/fetchChannelList'));
router.get('/:channelId', require('./GET/fetchChannelProfile'));

router.post('/:channelId', require('./POST/recoverChannel'));
router.post('/:channelId/publish', require('./POST/publishChannel'));

router.put('/:channelId', require('./PUT/updateChannel'));

router.delete('/:channelId', require('./DEL/destroyChannel'));
router.delete('/:channelId/block', require('./DEL/blockChannel'));
