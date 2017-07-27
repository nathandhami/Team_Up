'use strict';

const express = require('express');
const router = new express.Router();
const Event = require('../models/Event');

/* GET Event page */
router.route('/:id')
  .get((req, res, next) => {
    console.log('Event Room: ' + req.params.id);
    console.log('User id that requested it Room: ' + req.user._id);
    


    Event.findById(req.params.id).exec(function (err, event) {
      // Check if user is unauthorized to view page
      // Later will change to viewable by any user that joined the event
          console.log('Check the creator id of event: ' + event.createdBy);

      if (event.createdBy.toString() != req.user._id) {
        // Send unauthorized page (403 error)
         console.log('User is unauthorized to access event ' + req.user._id);

        res.send('<h1> Unauthorized. Status Code: 403 </h1>');
      }
      else {
        res.render('event', { event: event });
      }
    });


    return;
  });

module.exports = router;
