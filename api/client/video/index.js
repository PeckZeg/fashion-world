const router = module.exports = require('express').Router();

router.get('/', require('./get.fetch-video-list'));
router.get('/search', require('./get.search-video'));
router.get('/:videoId', require('./get.fetch-video-profile'));

router.put('/:videoId/favour', require('./put.favour-video'));
router.put('/:videoId/collect', require('./put.add-collection'));

router.delete('/:videoId/favour', require('./del.destroy-favourite-video'));
router.delete('/:videoId/collect', require('./del.destroy-collected-video'));

// router.get('/', require('./get.fetch-video-list'));
// router.get('/recommendations', require('./get.fetch-recommend-video-list'));
// router.get('/search', require('./get.search-video'));
// // router.get('/channel', require('./get.get-channel-list'));
// // router.get('/channel/category/:categoryId', require('./get.get-channel-category-profile'));
// // router.get('/channel/:channelId', require('./get.get-channel-profile'));
// // router.get('/channel/:channelId/categories', require('./get.get-channel-category-list'));
// router.get('/:videoId', require('./get.fetch-video-profile'));
// router.get('/:videoId/favourite-users', require('./get.fetch-favourite-user-list'));
//
// router.put('/:videoId/favour', require('./put.favour-video'));
// router.put('/:videoId/collect', require('./put.add-collection'));
//
// router.delete('/:videoId/favour', require('./del.destroy-favourite-video'));
// router.delete('/:videoId/collect', require('./del.destroy-collected-video'));
