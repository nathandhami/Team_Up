'use strict';

const passport = require('passport');
const express = require('express');
const User = require('../models/User');
const RegisterValidation = require('../models/RegisterValidation');
const xssFilters = require('xss-filters');
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
    failureRedirect: '/',
    failureFlash: true,
  }));

// redirecting the user to twitter.com
router.route('/twitter')
  .get(passport.authenticate('twitter'));

// if auth pass or fails
router.route('/twitter/callback')
  .get(passport.authenticate('twitter', {
    successRedirect: '/',
    failureRedirect: '/',
    failureFlash: true,
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
    failureFlash: true,
  }));

router.route('/register')
  .post((req, res) => {
    // req.checkBody(RegisterValidation);

    // req.getValidationResult().then((result) => {
    //   console.log(result.array());
    // if (!result.isEmpty()) {
    //   res.redirect('/register');
    //   return;
    // }
    // res.redirect('/');
    // });


    const firstName = xssFilters.inHTMLData(req.body.fname);
    const lastName = xssFilters.inHTMLData(req.body.lname);
    const email = xssFilters.inHTMLData(req.body.email);
    const password = xssFilters.inHTMLData(req.body.password);
    const confirmPassword = xssFilters.inHTMLData(req.body.confirmPassword);


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

    // user.validPassword(confirmPassword, (err, confirm) => {
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
  .post(passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/',
    failureFlash: true,
  }));

router.route('/logout')
  .get((req, res) => {
    req.logout();
    req.session.destroy();
    return res.redirect('/');
  });

router.use('/', (req, res, next) => {
  if (!req.user) {
    return res.redirect('/');
  }
  next();
});

module.exports = router;
