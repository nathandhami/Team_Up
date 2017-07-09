'use strict';

const passport = require('passport');
const express = require('express');
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
    req.checkBody(registerValidationOptions);


    req.getValidationResult().then((result) => {
      if (!result.isEmpty()) {
        res.redirect('/register');
        return;
      }
      res.redirect('/');
    });


    // const firstname = req.body.fname;
    // const lastname = req.body.lname;
    // const email = req.body.email;
    // const password = req.body.pwd;
    // const confirmPassword = req.body.confirmpwd;

    // console.log(req.body.fname);
    // console.log(req.body.lname);
    // console.log(req.body.email);
    // console.log(req.body.pwd);
    // console.log(req.body.confirmpwd);

    res.redirect('/register');
  });


router.route('/login')
  .post((req, res) => {
    res.redirect('/');
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
