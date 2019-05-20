var express = require('express');
var router = express.Router();

router.get('/user', function (req, res, next) {
    if (req.isAuthenticated()) {
        res.render("room", { "user": req.user })
    } else {
        res.redirect('/lobby/')
    }

});

router.get('/guest', function (req, res, next) {
    res.render("room")
});

module.exports = router;
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/lobby/')
}