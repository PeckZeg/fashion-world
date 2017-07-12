const router = module.exports = require('express').Router();

router.get('/', require('./get.fetch-category-list'));
router.get('/:categoryId', require('./get.fetch-channel-profile'));

router.post('/', require('./post.create-category'));
router.post('/:categoryId', require('./post.enable-category'));

router.put('/:categoryId', require('./put.update-category'));

router.delete('/:categoryId', require('./del.destroy-category'));
