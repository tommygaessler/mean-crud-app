/**
 * Created by davidsudia on 4/13/16.
 */
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Students = require('../models/students');

router.get('/', (req, res, next) => {
  Students.find({})
    .then(function(students) {
      res.status(200).json({
        status: 'success',
        data: students
      });
    })
    .catch(function(err) {
      return next(err);
    });
});

router.post('/', (req, res, next) => {
  Students.insertMany(req.body)
    .then(function(newStudents) {
      res.status(200).json({
        status: 'success',
        data: newStudents
      });
    })
    .catch(function(err) {
      return next(err);
    });
});

router.put('/:id', (req, res, next) => {
  var id = req.params.id;
  option = req.body;
  return Students.findByIdAndUpdate(id, option, {new: true})
    .then(function(update) {
      res.status(200).json({
        status: 'success',
        data: update
      });
    })
    .catch(function(err) {
      return next(err);
    });
});

router.delete('/remove/:id', (req, res, next) => {
  var id = req.params.id;
  Students.findByIdAndRemove(id)
    .then(function(students) {
      res.status(200).json({
        status: 'success'
      });
    })
    .catch(function(err) {
      return next(err);
    });
  });

module.exports = router;