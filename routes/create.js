'use strict';

const express = require('express');
const Event = require('../models/Event');
const xssFilters = require('xss-filters');
const router = new express.Router();

/* GET create event page */
router.route('/').get((req, res) => {
  res.render('create');
});

router.route('/').post('/home', (req, res) => {
  const teamupName = xssFilters.inHTMLData(req.body.teamupName);
  const sport = xssFilters.inHTMLData(req.body.sport);
  const locationName = xssFilters.inHTMLData(req.body.locationName);
  const locationAddress = xssFilters.inHTMLData(req.body.locationAddress);

  const event = new Event({
    teamupName: teamupName,
    sport: sport,
    locationName: locationName,
    locationAddress: locationAddress,
  });

  event.save((err, event) => {
    if (err) throw err;
    res.redirect('/home');
  });
});

module.exports = router;
