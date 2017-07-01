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
        image: req.user._json.image.url
      }
    });
  });

module.exports = router;
