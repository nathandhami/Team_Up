'use strict';

const express = require('express');
const Event = require('../models/Event');
const xssFilters = require('xss-filters');
const router = new express.Router();


/* GET create event page */
router.route('/').get((req, res) => {
	Event.find({}, function(err, events) {
    if (!err){ 
        console.log("Events: " + events);
    } 
    else {throw err;}
	});
});



module.exports = router;
