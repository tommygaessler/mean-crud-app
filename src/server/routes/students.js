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

router.post('/', (req, res, next) => {
  Students.insertMany(req.body, (err, newStudents) => {
    if (err) {
      return next(err);
    }
    res.status(200).json({
      status: 'success'
    });
  });
});

router.put('/:id', (req, res, next) => {
  var id = req.params.id;
  option = req.body;
  console.log('option', option);
  Students.findByIdAndUpdate(id, option, (err, update) => {
    if(err) {
      return next(err);
    }
    res.status(200).json({
      status: 'success'
    });
  })
});

router.delete('/remove/:id', (req, res, next) => {
  console.log('got request');
  var id = req.params.id;
  Students.findOneAndRemove(id, function(err, student) {
    if (err) {
      return next(err);
    }
    res.status(200).json({
      status: 'success'
    });
  });
});

module.exports = router;