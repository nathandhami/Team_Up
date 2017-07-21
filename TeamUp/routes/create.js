'use strict';

const express = require('express');
const router = new express.Router();

/* GET create event page */
router.route('/').get((req, res) => {
  res.render('create');
});

module.exports = router;
