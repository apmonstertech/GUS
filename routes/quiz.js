var express = require('express');
var router = express.Router();
var Quiz = require('../models/quiz');
require('../db/db')
const mongoose = require('mongoose');
var random = require('mongoose-simple-random');
var setUp = []

router.get('/', function (req, res, next) {
    res.render('panel');
});

router.post('/', function (req, res, next) {
    res.send("ELKO")
});

router.get('/starter', function (req, res, next) {
    res.render('quizStarter')
});

router.post('/starter', function (req, res, next) {
    Quiz.findRandom({}, {}, { limit: 2 }, function (err, results) {
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