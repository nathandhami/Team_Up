'use strict';

const express = require('express');
const router = new express.Router();
const Event = require('../models/Event');
const xssFilters = require('xss-filters');

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
        res.json({msg: 'Error!', 
              text: 'Not Found',
              status: 404, redirect: '/notFound'});
      }
      else {
        // Check if user belongs to the event
        let isEventMember = validateEventMember(event, userId);

        // Check if user is unauthorized to process
        if (isEventMember == false) {
          // Send unauthorized page (403 error)
          res.json({msg: 'Error!', 
                  text: 'You have not authorized to perform this action', 
                  status: 403, redirect: '/'});
        }
        else {
          event.teamupName = xssFilters.inHTMLData(req.body.teamupName);
          event.from = xssFilters.inHTMLData(req.body.from);
          event.to = xssFilters.inHTMLData(req.body.to);

          event.save((err) => {
            if (err) throw err;
          });

          res.json({msg: 'Event Updated!', 
                  text: event.teamupName + ' has been successfully updated', 
                  status: 204, redirect: '/'});
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
        res.json({msg: 'Error!', 
              text: 'Not Found',
              status: 404, redirect: '/notFound'});
      }
      else {
        // Check if user belongs to the event
        let isEventMember = validateEventMember(event, userId);

        // Check if user is unauthorized to process
        if (isEventMember == false) {
          // Send unauthorized page (403 error)
          res.json({msg: 'Error!', 
                  text: 'You have not authorized to perform this action', 
                  status: 403, redirect: '/'});
        }
        else {
          console.log(event.users);
          event.users.pull(req.user._id.toString());

          event.save((err) => {
            if (err) throw err;
          });

          console.log(event.users);
          res.json({msg: 'Updated!', 
                  text: 'You have been removed from ' + event.teamupName, 
                  status: 204, redirect: '/'});
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
        res.json({msg: 'Error!', 
              text: 'Not Found',
              status: 404, redirect: '/notFound'});
      }
      else {
        // Check if user belongs to the event
        let isEventMember = validateEventMember(event, userId);

        // Check if user is unauthorized to process
        if (isEventMember == false) {
          // Send unauthorized page (403 error)
          res.json({msg: 'Error!', 
                      text: 'You have not authorized to perform this action', 
                      status: 403, redirect: '/'});
        }
        else {
          let resText = event.teamupName + ' has been successfully deleted.'
          event.remove();

          res.json({msg: 'Deleted!', 
                      text: resText, 
                      status: 204, redirect: '/'});
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
