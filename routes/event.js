'use strict';

const express = require('express');
const router = new express.Router();
const Event = require('../models/Event');

/* GET Event page */
router.route('/chatroom/:id')
  .get((req, res, next) => {

    const id = req.params.id;
    const userId = req.user._id;

    Event.findOne({ 'aliasId': id }).exec(function (err, event) {
      if (err || event == null) {
        res.status(404).render('notFound', {
          title: 'Page Not Found',
        });
      }
      else {
        // Check if user belongs to the event
        let isJoined = event.users.filter(function(value){ return value == userId;});

        // Check if user is unauthorized to view page
        if (isJoined.length <= 0) {
          // Send unauthorized page (403 error)
          res.send('<h1> Unauthorized. Status Code: 403 </h1>');
        }
        else {
          res.render('event', { csrfToken: req.csrfToken(), title: event.teamupName, event: event });
        }

      }
    });


    return;
  });

module.exports = router;
