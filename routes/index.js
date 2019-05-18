var express = require('express');
var router = express.Router();
var Countries = require('../models/countries');
/* GET home page.  ensureAuthenticated, */
router.get('/', function (req, res, next) {
  // res.render('index', { title: 'Express' });
  // req.flash('error', 'XDDDDDDDDDDDDDDDDDDDDDDDD')
  //res.cookie('name', 'express', { expire: 360000 + Date.now() })
  var hour = 3600000;
  req.session.cookie.expires = new Date(Date.now() + hour);
  req.session.cookie.maxAge = hour;

  if (req.session.page_views) {
    req.session.page_views++;
    console.log(req.session.page_views)
  } else {
    req.session.page_views = 1;
  }
  if (req.isAuthenticated()) {
    res.render('index', { "user": req.user })
    console.log(req.user.username)
  } else {
    res.render('index')
  }
});

router.post("/", function (req, res, next) {
  console.log(req.body.country)
  var country = req.body.country
  Countries.find({ code: country }, function (err, dosc) {
    if (!err) {
      console.log(dosc)
      res.send(dosc)
    } else {
      console.log("ERROR in counry")
    }
  })
})


function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/users/login')
}

module.exports = router;
