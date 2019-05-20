var express = require('express');
var router = express.Router();
var passport = require("passport");
var LocalStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken')
var User = require('../models/user');
const blackList = ['chuj', 'kurwa', 'kutas', 'pizda', 'cipa', 'ciota', 'kutasiarz', 'skurwiel', 'skurwysyn', 'debil', 'dzban', 'stary', 'stara', 'wazon', 'wale', 'wiadro', 'frajer', 'qtas', 'qrwa', 'jabany', 'jebać', 'wykurw']

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/register', function (req, res, next) {
  res.render('register', { title: "Register Page" })
});

router.get('/login', function (req, res, next) {
  const flashMessages = res.locals.getMessages()

  if (flashMessages.error) {
    res.render('login', {
      showErrors: true,
      errors: flashMessages.error
    });
  }
  else {
    res.render('login');
  }

});

router.post('/login',
  passport.authenticate('local',
    { failureRedirect: '/users/login', failureFlash: true }),
  function (req, res) {
    res.redirect('/')

  });

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.getUserById(id, function (err, user) {
    done(err, user);
  });
});


passport.use('local', new LocalStrategy(function (username, password, done) {
  User.getUserByUsername(username, function (err, user) {
    if (err) throw err;
    if (!user) {
      return done(null, false, { message: 'Unknow User' })
    }
    User.comparePassword(password, user.password, function (err, isMatch) {
      if (err) throw done(err);
      if (isMatch) {
        return done(null, user)
      } else {
        return done(null, false, { message: 'Invalid Password' })
      }
    })
  })

}))



router.post('/register', function (req, res, next) {
  var username = req.body.username;
  var email = req.body.email;
  var age = req.body.age;
  var password = req.body.password;

  var elo = username.toLowerCase()
  blackList.map(m => {
    if (elo.includes(m)) {
      console.log("ZŁY USER")
      req.checkBody('username', 'Wrong username').contains('username', m)
    }
  })
  req.checkBody('username', 'Username field is required').notEmpty()
  req.checkBody('username', 'Username exists').exists()
  req.checkBody('username').isLength({ min: 3 }).withMessage("Too short message, min 3 characters")
  req.checkBody('email', 'Email field is required').notEmpty()
  req.checkBody('email', 'It is not an email').isEmail()
  req.checkBody('password', 'Password field is required').notEmpty()
  req.checkBody('age', 'Age field is required').notEmpty()
  req.checkBody('passwordAgain', 'Passwords do not match').equals(req.body.password);

  var errors = req.validationErrors();

  if (errors) {
    console.log("Errors");
    res.render('register', { errors: errors })
  } else {
    var newUser = new User({
      username: username,
      email: email,
      age: age,
      password: password,
      scoreQuiz: 0,
      scoreTraining: 0,
      scoreRivalry: 0
    })

    User.getUserByUsername(username, function (err, user) {
      if (err) throw err;
      console.log(user)
      if (user) {
        console.log("USER EXISTS")
      } else {
        User.createUser(newUser, function (err, user) {
          if (err) throw err;
        });
        req.flash('succes', 'You are now registered and can logged')
        res.location('/')
        res.redirect('/')
      }
    });
  }
});

router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/')
})

router.get('/profile', function (req, res) {
  if (req.isAuthenticated()) {
    res.render('profile', { "user": req.user })
  } else {
    res.redirect('/users/login')
  }
})

module.exports = router;
