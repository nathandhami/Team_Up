'use strict';

const express = require('express');
const router = new express.Router();

/* GET sports page */
router.route('/').get((req, res) => {
  res.render('sports', {
    csrfToken: req.csrfToken()
  });
});

module.exports = router;
