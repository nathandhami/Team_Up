'use strict';

const express = require('express');
const router = new express.Router();
const Event = require('../models/Event');

/* GET Event Room page */
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
        let isEventMember = validateEventMember(event, userId);

        // Check if user is unauthorized to view page
        if (isEventMember == false) {
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

  /* Process Edit */
router.route('/edit/:id')
  .post((req, res, next) => {

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
        let isEventMember = validateEventMember(event, userId);

        // Check if user is unauthorized to process
        if (isEventMember == false) {
          // Send unauthorized page (403 error)
          res.send('<h1> Unauthorized. Status Code: 403 </h1>');
        }
        else {
          // extract form here & update event

          res.redirect('/');
        }
      }
    });


    return;
  });

  /* Process Leave */
  router.route('/leave/:id')
  .post((req, res, next) => {

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
        let isEventMember = validateEventMember(event, userId);

        // Check if user is unauthorized to process
        if (isEventMember == false) {
          // Send unauthorized page (403 error)
          res.send('<h1> Unauthorized. Status Code: 403 </h1>');
        }
        else {
          // ADD LEAVE CODE here
          // Flash user succcessfully left event

          res.redirect('/');
        }
      }
    });


    return;
  });

  /* Process delete */
  router.route('/delete/:id')
  .post((req, res, next) => {

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
        let isEventMember = validateEventMember(event, userId);

        // Check if user is unauthorized to process
        if (isEventMember == false) {
          // Send unauthorized page (403 error)
          res.send('<h1> Unauthorized. Status Code: 403 </h1>');
        }
        else {
          // Delete event
          // Flash user successfully deleted event

          res.redirect('/');
        }
      }
    });

    return;
  });

function validateEventMember(event, userId){
  let isJoined = event.users.filter(function(value){ return value == userId;});
  let retVal;

  // Check if user belongs to the event
  if (isJoined.length <= 0){
    retVal = false;
  }
  else {
    retVal = true;
  }
  return retVal; 
}

function validateEventCreator(event, userId){

}

module.exports = router;
