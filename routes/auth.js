'use strict';

const passport = require('passport');
const express = require('express');
const User = require('../models/User');
const router = new express.Router();

// redirecting the user to google.com
router.route('/google')
  .get(passport.authenticate('google', {
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ],
  }));

// if auth pass or fails
router.route('/google/callback')
  .get(passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/login',
  }));

// redirecting the user to twitter.com
router.route('/twitter')
  .get(passport.authenticate('twitter'));

// if auth pass or fails
router.route('/twitter/callback')
  .get(passport.authenticate('twitter', {
    successRedirect: '/',
    failureRedirect: '/login',
  }));

// redirecting the user to twitter.com
router.route('/facebook')
  .get(passport.authenticate('facebook', {
    scope: [
      'email',
    ],
  }));

// if auth pass or fails
router.route('/facebook/callback')
  .get(passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/login',
  }));

router.route('/register')
  .post((req, res) => {
    // req.checkBody(registerValidationOptions);


    // req.getValidationResult().then((result) => {
    //   if (!result.isEmpty()) {
    //     res.redirect('/register');
    //     return;
    //   }
    //   res.redirect('/');
    // });


    const firstName = req.body.fname;
    const lastName = req.body.lname;
    const email = req.body.email;
    const password = req.body.pwd;
    const confirmPassword = req.body.confirmpwd;


    const user = new User({
      firstname: firstName,
      lastname: lastName,
      email: email,
      password: password,
    });

    user.save((err, user) => {
      if (err) throw err;
      req.login(user, (err) => {
        return res.redirect('/');
      });
    });

    // user.comparePassword(confirmPassword, (err, confirm) => {
    //   if (err) throw err;
    //   console.log(confirm);
    //   if (confirm) {

    //   }
    // });

    // console.log(firstname);
    // console.log(lastname);
    // console.log(email);
    // console.log(password);
    // console.log(confirmPassword);

    // res.redirect('/register');
  });


router.route('/login')
  .post((req, res) => {
    const email = req.body.email;
    const password = req.body.pwd;

    const query = {
      'email': email,
    };

    User.findOne(query, (err, user) => {
      if (user) {
        user.comparePassword(password, (err, match) => {
          if (err) throw err;

          if (match) {
            req.login(user, (err) => {
              return res.redirect('/');
            });
          } else {
            return res.redirect('/');
          }
        });
      } else {
        return res.redirect('/');
      }
    });
  });

router.use('/', (req, res, next) => {
  if (!req.user) {
    res.redirect('/');
  }
  next();
});

const registerValidationOptions = {
  'email': {
    notEmpty: true,
    isEmail: {
      errorMessage: 'Invalid Email',
    },
  },
  'pwd': {
    notEmpty: true,
    matches: {
      options: ['example', 'i'],
    },
    errorMessage: 'Invalid Password',
  },
  'confirmpwd': {
    notEmpty: true,
    equals: 'pwd',
    matches: {
      options: ['example', 'i'],
    },
    errorMessage: 'Invalid Password',
  },
  'fname': {
    isLength: {
      options: [{
        min: 2,
        max: 20,
      }],
      errorMessage: 'Must be between 2 and 10 chars long',
    },
    isAlpha: {
      errorMessage: 'Must have only alphabets',
    },
    errorMessage: 'Invalid First Name',
  },
  'lname': {
    isLength: {
      options: [{
        min: 2,
        max: 20,
      }],
      errorMessage: 'Must be between 2 and 10 chars long',
    },
    isAlpha: {
      errorMessage: 'Must have only alphabets',
    },
    errorMessage: 'Invalid Last Name',
  },
};

module.exports = router;
