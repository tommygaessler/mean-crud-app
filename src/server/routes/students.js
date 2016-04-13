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
      console.log(err);
      return next(err);
    }
    res.status(200).json({
      status: 'success',
      students: newStudents
    });
  });
});

router.put('/:id', (req, res, next) => {
  var id = req.params.id;
  option = req.body;
  return Students.findByIdAndUpdate(id, option, {new: true}, (err, update) => {
    if(err) {
      return next(err);
    }
    res.status(200).json({
      status: 'success',
      student: update
    });
  })
});

router.delete('/remove/:id', (req, res, next) => {
  var id = req.params.id;
  Students.findByIdAndRemove(id, function(err, student) {
    if (err) {
      console.log(err);
      return next(err);
    }
    res.status(200).json({
      status: 'success'
    });
  });
});

module.exports = router;