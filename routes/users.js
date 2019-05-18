var express = require('express');
var router = express.Router();
var passport = require("passport");
var LocalStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken')
var User = require('../models/user');
const blackList = ['chuj', 'kurwa', 'kutas', 'pizda', 'cipa', 'ciota', 'kutasiarz', 'skurwiel', 'skurwysyn', 'debil', 'dzban', 'stary', 'stara', 'wazon', 'wale', 'wiadro', 'frajer', 'qtas', 'qrwa', 'jabany', 'jebać', 'wykurw']
var usernameLogin, passwordLogin
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/', function (req, res, next) {
  console.log(req.body)
  usernameLogin = req.body.username
  passwordLogin = req.body.password
  console.log(usernameLogin, passwordLogin)
});


router.get('/login', function (req, res, next) {
  // req.flash('error', 'You are now logged in')
  const flashMessages = res.locals.getMessages()
  console.log('flash', flashMessages)

  if (flashMessages.error) {
    res.render('login', {
      showErrors: true,
      errors: flashMessages.error
    });
  }
  else {
    res.render('login');
  }
  //res.render('login', { title: "Login Page" });

});

// router.post('/login/ajax', passport.authenticate('local-login'));

// router.post('/login', function (req, res, next) {
//   console.log(req.body)
//   passport.authenticate('local',
//     { failureRedirect: '/', failureFlash: true }),
//     function (err, user, info) {

//       console.log("PASUJE")

//     }
// });

router.post('/login',
  passport.authenticate('local',
    { failureRedirect: '/', failureFlash: true }),
  function (req, res) {
    // req.flash('info', 'You are now logged in')	    // req.flash('info', 'You are now logged in')
    res.redirect('/')

  });

// router.post('/login', function (req, res) {
//   console.log(req)
//   passport.authenticate('local', function (err, user, params) {
//     if (req.xhr) {
//       //thanks @jkevinburton
//       if (err) { return res.json({ error: err.message }); }
//       // e.g. in auth.js:
//       // if (!user.emailVerified) { return done(null, false, { message: 'Email is not verified. Please check your email for the link.' }); }
//       if (!user && params) { return res.json({ error: params.error }); }
//       if (!user) { return res.json({ error: "Invalid Login" }); }
//       // req.login(user, {}, function (err) {
//       //   if (err) { return res.json({ error: err }); }
//       //   return res.json(
//       //     {
//       //       user: {
//       //         user: req.user.user,
//       //         password: req.user.password,
//       //       },
//       //       success: true
//       //     });
//       // });
//     } else {
//       if (err) { return res.redirect('/login'); }
//       if (!user) { return res.redirect('/login'); }
//       req.login(user, {}, function (err) {
//         if (err) { return res.redirect('/login'); }
//         return res.redirect('/');
//       });
//     }
//   })(req, res);
// });

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.getUserById(id, function (err, user) {
    done(err, user);
  });
});


passport.use('local', new LocalStrategy(function (username, password, done) {
  console.log(username)
  User.getUserByUsername(username, function (err, user) {
    if (err) throw err;
    if (!user) {
      return done(null, false, { message: 'Unknow User' })
    }
    User.comparePassword(password, user.password, function (err, isMatch) {
      if (err) throw done(err);
      if (isMatch) {
        console.log(user)
        return done(null, user)
      } else {
        return done(null, false, { message: 'Invalid Password' })
      }
    })
  })

}))



router.post('/register', function (req, res, next) {
  console.log(req.body)
  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password;
  var age = req.body.age;

  var elo = username.toLowerCase()
  console.log(elo)
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
      password: password,
      age: age,
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
          console.log(user);
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

})



module.exports = router;
