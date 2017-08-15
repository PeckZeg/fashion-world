const router = module.exports = require('express').Router();

router.get('/', require('./GET.fetchVideoList'));
router.get('/:videoId', require('./GET.fetchVideoProfile'));

router.post('/:videoId', require('./POST.recoverVideo'));
router.post('/:videoId/cover', require('./POST.uploadCover'));
router.post('/:videoId/publish', require('./POST.publishVideo'));
router.post('/:videoId/recommend', require('./POST.recommendVideo'));

router.put('/:videoId', require('./PUT.updateVideo'));

router.delete('/:videoId', require('./DEL.destroyVideo'));
router.delete('/:videoId/block', require('./DEL.blockVideo'));
router.delete('/:videoId/supplant', require('./DEL.supplantVideo'));
