'use strict';

const express = require('express');
const Event = require('../models/Event');
const xssFilters = require('xss-filters');
const router = new express.Router();

/* GET create event page */
router.route('/').get((req, res) => {
  res.render('create', {
    csrfToken: req.csrfToken()
  });
});

/* POST create event */
router.route('/').post((req, res) => {
  const teamupName = xssFilters.inHTMLData(req.body.teamupName);
  const date = xssFilters.inHTMLData(req.body.date);
  const from = xssFilters.inHTMLData(req.body.from);
  const to = xssFilters.inHTMLData(req.body.to);
  const sport = xssFilters.inHTMLData(req.body.sport);
  const locationName = xssFilters.inHTMLData(req.body.locationName);
  const locationAddress = xssFilters.inHTMLData(req.body.locationAddress);
  const userId = req.user._id;

  const event = new Event({
    teamupName: teamupName,
    date: date,
    from: from,
    to: to,
    sport: sport,
    locationName: locationName,
    locationAddress: locationAddress,
    createdBy: userId,
  });

  console.log('Create: ' + req.user._id);

  event.save((err, event) => {
    if (err) throw err;
    res.redirect('/');
  });
});

module.exports = router;
