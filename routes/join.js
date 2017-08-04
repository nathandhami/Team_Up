'use strict';

const express = require('express');
const Event = require('../models/Event');
const xssFilters = require('xss-filters');
const router = new express.Router();
const User = require('../models/User');


/* GET join event page */
router.route('/')
  .get((req, res) => {
  	Event.find({users: {$ne: req.user._id.toString()}}, function(err, events) {
      if (!err){
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
    const eventId = xssFilters.inHTMLData(req.body.eventAliasId);
    console.log(eventId);

    User.findOne({
      _id: userId,
    }, (err, user) => {
      if (err) {
        throw err;
      }

      if (user) {
        Event.findOne({
          'aliasId': eventId,
        }, (err, event) => {
          if (err) {
            throw err;
          }

          if (event) {
            // for (let i = 0; i < event.users.length; i++) {
            //   if (event.users[i] == user._id) {
            //     console.log("FOUND");
            //   }
            // }

            let isJoined = event.users.filter(function(value){ return value == user._id;});
              
            // add check for max number of players.
            if (isJoined.length > 0) {
              console.log("You have already joined");
              res.json({msg: 'Error!', 
                      text: 'You have already joined this event', status: 400,
                    redirect: '/'});
            } else {
              event.users.push(userId.toString());

              event.save((err) => {
                if (err) throw err;
              });

              res.json({msg: 'Successfully joined ' + event.teamupName + '!', 
                    text: 'You can now chat with other members of this event.', 
                    status: 204,
                    redirect: '/'});
            }

            console.log(event);
          }
        });
      }

    });
    return;
  })



module.exports = router;
