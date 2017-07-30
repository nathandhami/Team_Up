'use strict';

const express = require('express');
const router = new express.Router();
const Event = require('../models/Event');

/* GET Event page */
router.route('/chatroom/:id')
  .get((req, res, next) => {

    const id = req.params.id;

    Event.findOne({'aliasId': id}).exec(function (err, event) {
      if (err || event == null) {
        res.status(404).render('notFound', {
          title: 'Page Not Found',
        });
      }
      // Check if user is unauthorized to view page
      // Later will change to viewable by any user that joined the event
      else if (event.createdBy.toString() != req.user._id) {
        // Send unauthorized page (403 error)
        res.send('<h1> Unauthorized. Status Code: 403 </h1>');
      }
      else {
        res.render('event', { csrfToken: req.csrfToken(), event: event });
      }
    });


    return;
  });

module.exports = router;
