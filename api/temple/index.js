const Mock = require('mockjs');
const _ = require('lodash');

let router = module.exports = require('express').Router();

router.get('/recommend', require('./get-recommend-list'));
router.get('/detail/:id', require('./get-profile'));
