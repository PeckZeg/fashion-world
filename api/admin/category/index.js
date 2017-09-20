const router = module.exports = require('express').Router();

router.get('/', require('./GET/fetchCategoryList'));
router.get('/:categoryId', require('./GET/fetchCategoryProfile'));

router.post('/', require('./POST/createCategory'));
router.post('/:categoryId', require('./POST/publishCategory')); // deprecated
router.post('/:categoryId/publish', require('./POST/publishCategory'));
router.post('/:categoryId/recover', require('./POST/recoverCategory'));

router.put('/:categoryId', require('./PUT/updateCategory'));

router.delete('/:categoryId', require('./DEL/destroyCategory'));
router.delete('/:categoryId/block', require('./DEL/blockCategory'));
