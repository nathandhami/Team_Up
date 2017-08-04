'use strict';

const express = require('express');
const Event = require('../models/Event');
const xssFilters = require('xss-filters');
const router = new express.Router();


/* GET join event page */
router.route('/')
  .get((req, res) => {
  	Event.find({}, function(err, events) {
      if (!err){ 
          console.log(events)
          res.render('join', {
            title: 'Join Events',
            csrfToken: req.csrfToken(),
            userEvents: events,
          });
      } 
      else {throw err;}
  	});
  })

  .post((req, res) => {
    const userId = req.user._id;
    
    // Event.findOne({
    //   _id: event_id,
    // }, (err, event) => {
    //   if (err) {
    //     throw err;
    //   }

    //   if (event) {
    //   }
    // });
    return;
  })



module.exports = router;
