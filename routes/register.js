'use strict';

const express = require('express');
const router = new express.Router();

/* GET register page */
router.route('/')
  .get((req, res, next) => {
    if (!req.isAuthenticated()) {
      res.render('register', {
        title: 'Register',
        csrfToken: req.csrfToken(),
      });
      return;
    }
    return res.redirect('/');
  });

module.exports = router;
