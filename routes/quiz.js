var express = require('express');
var router = express.Router();
var Quiz = require('../models/quiz');

require('../db/db')
const mongoose = require('mongoose');
var random = require('mongoose-simple-random');
var setUp = []

router.get('/', function (req, res, next) {
    if (req.isAuthenticated()) {
        res.render('panel', { "name": req.user.username })
        console.log(req.user.username)
    } else {
        res.render('panel');
    }
});

router.post('/', function (req, res, next) {
    res.send("ELKO")
});

router.get('/starter', function (req, res, next) {
    if (req.isAuthenticated()) {
        res.render('quizStarter', { "name": req.user.username })
        console.log(req.user.username)
    } else {
        res.render('quizStarter')
    }
});

router.post('/starter', function (req, res, next) {
    Quiz.findRandom({}, {}, { limit: 3 }, function (err, results) {
        if (!err) {
            console.log(results);
            setUp = results
            res.send(results)
        }
    });
    
});


router.get('/ranked', function (req, res, next) {
    res.render('quizRanked');

});
router.get('/rivalry', function (req, res, next) {
    res.render('quizRivalry');
});

module.exports = router;