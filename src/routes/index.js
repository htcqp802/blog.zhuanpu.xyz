var express = require('express');
var router = express.Router();
module.exports = router;

router.get('/', function (req, res, next) {
    res.locals.title = 'haha';
    res.viewPath = 'home';
    next();
});

router.get('/test', function (req, res, next) {
    res.locals.test = 'lol';
    next();
})
