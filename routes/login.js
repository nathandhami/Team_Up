'use strict';

const express = require('express');
const router = new express.Router();

/* GET login page */
router.route('/')
  .get((req, res, next) => {
    if (!req.isAuthenticated()) {
      res.render('login', {
        title: 'Login',
      });
      return;
    }
    res.redirect('/');
  });

module.exports = router;
