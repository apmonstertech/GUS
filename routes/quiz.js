var express = require('express');
var router = express.Router();
var Quiz = require('../models/quiz');
var User = require('../models/user');

require('../db/db')
const mongoose = require('mongoose');
var random = require('mongoose-simple-random');
var setUp = []

router.get('/', function (req, res, next) {
    if (req.isAuthenticated()) {
        res.render('panel', { "user": req.user })
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
        res.render('quizStarter', { "user": req.user })
        console.log(req.user.username)
    } else {
        res.render('quizStarter')
    }
});

router.post('/starter', function (req, res, next) {
    Quiz.findRandom({}, {}, { limit: 1 }, function (err, results) {
        if (!err) {
            console.log(results);
            setUp = results
            res.send(results)
        }
    });

});

router.get('/ranked', function (req, res, next) {
    if (req.isAuthenticated()) {
        res.render('quizRanked', { "user": req.user })
        console.log(req.user.username)
    } else {
        res.render('quizRanked')
    }
});

router.post('/ranked', function (req, res, next) {
    Quiz.findRandom({}, {}, { limit: 10 }, function (err, results) {
        if (!err) {
            console.log(results);
            setUp = results
            res.send(results)
        }
    });

});

router.post('/starter/result', function (req, res, next) {
    console.log(req.body)
    var score = parseInt(req.body.score) * 5
    if (req.user) {
        User.findOne({ username: req.user.username }, function (error, docs) {
            docs.scoreTraining = (docs.scoreTraining + score)
            console.log(docs);
            docs.save()
        });
    }
});


router.get('/ranked', function (req, res, next) {
    res.render('quizRanked');
});
router.get('/rivalry', function (req, res, next) {
    res.render('quizRivalry');
});

module.exports = router;