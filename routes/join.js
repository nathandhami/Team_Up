'use strict';

const express = require('express');
const Event = require('../models/Event');
const xssFilters = require('xss-filters');
const router = new express.Router();


/* GET create event page */
router.route('/').get((req, res) => {

  Event.find({}).exec(function (events) {
    Event.count().exec(function (count) {
      res.render('join', {
        csrfToken: req.csrfToken(),
        events: events,
        numOfEvents: count,
      });
    });
  });

});



module.exports = router;
