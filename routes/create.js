'use strict';

const express = require('express');
const router = new express.Router();

/* GET create event page */
router.route('/create').get((req, res) => {
  res.render('/create.pug');
});

module.exports = router;
