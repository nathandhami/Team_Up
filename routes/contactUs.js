'use strict';

const express = require('express');
const router = new express.Router();

/* GET Edit Account page */
router.route('/')
  .post((req, res, next) => {
    res.redirect('/');
    return;
  });

module.exports = router;
