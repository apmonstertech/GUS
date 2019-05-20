var express = require('express');
var router = express.Router();
var Countries = require('../models/countries');
/* GET home page.  ensureAuthenticated, */
router.get('/', function (req, res, next) {
  var hour = 3600000;
  req.session.cookie.expires = new Date(Date.now() + hour);
  req.session.cookie.maxAge = hour;
  if (req.session.page_views) {
    req.session.page_views++;
  } else {
    req.session.page_views = 1;
  }
  if (req.isAuthenticated()) {
    res.render('index', { "user": req.user })
  } else {
    res.render('index')
  }
});

router.post("/", function (req, res, next) {
  var country = req.body.country
  Countries.find({ code: country }, function (err, dosc) {
    if (!err) {
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
