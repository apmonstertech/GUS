var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    if (req.isAuthenticated()) {
        res.render('lobby', { "user": req.user })
        console.log(req.user.username)
    } else {
        res.render('lobby')
    }

});


module.exports = router;