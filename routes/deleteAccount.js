'use strict';

const express = require('express');
const xssFilters = require('xss-filters');
const User = require('../models/User');
const router = new express.Router();


router.route('/')
  .post((req, res, next) => {
    // extract data
    const userEmail = xssFilters.inHTMLData(req.body.userEmail);
    const userPass = xssFilters.inHTMLData(req.body.userPass);

    User.findOne({email: userEmail}, (err, user) => {
      if (err) throw err;

      if (user) {
        if (user.validPassword(userPass)) {
          user.remove();
        } else {
          //return 403
        }
      }
    });

    res.redirect('/logout');
    return;
  });

module.exports = router;
