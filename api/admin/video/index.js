let router = module.exports = require('express').Router();

router.get('/', require('./get.fetch-video-list'));
router.get('/:videoId', require('./get.fetch-video-profile'));

router.put('/:videoId', require('./put.update-video'));

router.delete('/:videoId', require('./delete.destroy-video'));
