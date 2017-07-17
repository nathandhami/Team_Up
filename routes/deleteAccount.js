'use strict';

const express = require('express');
const xssFilters = require('xss-filters');
const router = new express.Router();

/* GET Edit Account page */
router.route('/')
  .post((req, res, next) => {
    // extract data
    const userEmail = xssFilters.inHTMLData(req.body.userEmail);
    const userPass = xssFilters.inHTMLData(req.body.userPass);

    res.redirect('/');
    return;
  });

module.exports = router;
