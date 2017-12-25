const router = module.exports = require('express').Router();

// router.use((req, res, next) => {
//   console.log(req.host);
//   res.append('Access-Control-Allow-Origin', 'http://wx.fashionworldcn.com');
//   next();
// });

router.get('/', require('./GET.fetchBannerList'));
