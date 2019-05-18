var express = require('express');
var router = express.Router();
var User = require('../models/user');

require('../db/db')
const mongoose = require('mongoose');

router.get('/', function (req, res, next) {
    if (req.isAuthenticated()) {
        res.render("ranking", { "user": req.user })
        console.log(req.user.username)
    } else {
        res.render("ranking")
    }
});

router.post('/starter', function (req, res, next) {
    var q = User.find().limit(3).sort({ scoreTraining: -1 });
    q.exec(function (err, docs) {
        var obj = []
        docs.map(m => {
            obj.push({ username: m.username, score: m.scoreTraining })
        })
        res.send(obj)
    });
});

module.exports = router;