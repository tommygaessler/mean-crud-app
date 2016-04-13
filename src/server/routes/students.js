/**
 * Created by davidsudia on 4/13/16.
 */
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Students = require('../models/students');

router.get('/', (req, res, next) => {
  Students.find({}, (err, students) => {
    if (err) {
      return next(err);
    }
    res.status(200).json({
      status: 'success',
      data: students
    });
  });
});

module.exports = router;