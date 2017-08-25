const router = module.exports = require('express').Router();

router.get('/', require('./GET/fetchBannerList'));

router.post('/:bannerId', require('./POST/recoverBanner'));
router.post('/:bannerId/cover', require('./POST/uploadCover'));
router.post('/:bannerId/publish', require('./POST/publishBanner'));

router.put('/:bannerId', require('./PUT/updateBanner'));

router.delete('/:bannerId', require('./DEL/destroyBanner'));
router.delete('/:bannerId/block', require('./DEL/blockBanner'));
