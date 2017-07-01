'use strict';

const express = require('express');
const router = express.Router();

/* GET login page */
router.route('/')
  .get((req, res, next) => {
    res.render('login', {
      title: 'Login'
    });
  }).post((req, res, next) => {
    res.redirect('/');
  });

module.exports = router;
