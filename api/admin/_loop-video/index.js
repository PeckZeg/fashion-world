const router = module.exports = require('express').Router();

router.get('/', require('./GET/fetchLoopVideoList'));
router.get('/:loopVideoId', require('./GET/fetchLoopVideoProfile'));

router.post('/', require('./POST/createLoopVideo'));
router.post('/:loopVideoId/cover', require('./POST/uploadCover'));
router.post('/:loopVideoId/publish', require('./POST/publishLoopVideo'));
router.post('/:loopVideoId/recover', require('./POST/recoverLoopVideo'));

router.put('/:loopVideoId', require('./PUT/updateLoopVideo'));

router.delete('/:loopVideoId/block', require('./DEL/blockLoopVideo'));
router.delete('/:loopVideoId', require('./DEL/destroyLoopVideo'));
