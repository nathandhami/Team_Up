'use strict';

const express = require('express');
const router = new express.Router();

/* GET register page */
router.route('/')
  .get((req, res, next) => {
    res.render('register', {
      title: 'Register',
    });
  }).post((req, res, next) => {
    res.redirect('/');
  });

module.exports = router;
