var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var Schema = mongoose.Schema;

var StudentSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true
  }
});

var Student = mongoose.model('students', StudentSchema);

module.exports = Student;
