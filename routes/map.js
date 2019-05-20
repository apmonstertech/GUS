var express = require('express');
var router = express.Router();
var Countries = require('../models/countries');

router.get('/', function (req, res, next) {
    if (req.isAuthenticated()) {
        res.render('map', { "user": req.user })
    } else {
        res.render('map')
    }
});

router.post('/map', function (req, res, next) {
    Countries.find({}, function (err, results) {
        if (!err) {
            res.send(results);
        }
    });
});

module.exports = router;