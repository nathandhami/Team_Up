'use strict';

const express = require('express');
const router = new express.Router();

/* GET Event page */
router.route('/')
  .get((req, res, next) => {
    res.render('event');
    return;
  });

module.exports = router;
