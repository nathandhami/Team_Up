'use strict';

const passport = require('passport');
const express = require('express');
const router = express.Router();

// redirecting the user to google.com
router.route('/google')
  .get(passport.authenticate('google', {
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email'
    ]
  }));

// if auth pass or fails
router.route('/google/callback')
  .get(passport.authenticate('google', {
    successRedirect: '/auth',
    failureRedirect: '/login'
  }));

// redirecting the user to twitter.com
router.route('/twitter')
  .get(passport.authenticate('twitter'));

// if auth pass or fails
router.route('/twitter/callback')
  .get(passport.authenticate('twitter', {
    successRedirect: '/auth',
    failureRedirect: '/login'
  }));

// redirecting the user to twitter.com
router.route('/facebook')
  .get(passport.authenticate('facebook', {
    scope: [
      'email'
    ]
  }));

// if auth pass or fails
router.route('/facebook/callback')
  .get(passport.authenticate('facebook', {
    successRedirect: '/auth',
    failureRedirect: '/login'
  }));

router.use('/', (req, res, next) => {
  if (!req.user) {
    res.redirect('/');
  }
  next();
});

router.route('/')
  .get((req, res, next) => {
    res.render('auth', {
      title: 'Home',
      user: {
        name: req.user.displayName,
        image: req.user.image
      }
    });
  });

module.exports = router;
