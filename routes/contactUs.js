'use strict';

const express = require('express');
const xssFilters = require('xss-filters');
const router = new express.Router();

/* GET Edit Account page */
router.route('/')
  .post((req, res, next) => {
    // extract data
    const contactName = xssFilters.inHTMLData(req.body.contactName);
    const contactEmail = xssFilters.inHTMLData(req.body.contactEmail);
    const contactLocation = xssFilters.inHTMLData(req.body.contactLocation);
    const contactMsg = xssFilters.inHTMLData(req.body.contactMsg);

    // TODO: send email

    res.redirect('/');
    return;
  });

module.exports = router;
